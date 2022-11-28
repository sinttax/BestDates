import { Router, Response, Request } from 'express';
import { UserEntity } from '../db/entity/userEntity';
import { UserService } from '../service/user/userService';
import { upload } from '../filestorage';
import bcrypt from 'bcrypt';

declare module 'express-session' {
  export interface SessionData {
    userId: any;
  }
}

export class AuthController {
  private readonly _router: Router = Router();

  async checkPassword(req: Request, res: Response, user: UserEntity) {
    const isPassValid = await bcrypt.compare(
      req.body.user_password,
      user?.user_password as string
    );
    if (isPassValid) {
      return user?.user_id;
    }
  }

  constructor(private userService: UserService) {
    this._router.post(
      '/registration',
      upload.single('photo'),
      async (req: Request, res: Response) => {
        const photo: any = req.file?.filename;
        const user: UserEntity = req.body as UserEntity;
        const emailTaken = await this.userService.findUserByUserEmail(
          req.body.user_email
        );
        if (emailTaken) {
          return res.json({
            status: 'Error',
            message: 'E-mail address already taken',
          });
        }
        res.json(await this.userService.createUser(user, photo));
      }
    );

    this._router.post(
      '/login',
      async (req: Request, res: Response): Promise<any> => {
        const userFound = await this.userService.findUserByUserEmail(
          req.body.user_email
        );

        if (!userFound) {
          return res
            .status(403)
            .json({ error: 'Provided credentials are not valid!' });
        }

        const userId = await this.checkPassword(req, res, userFound);

        if (!userId) {
          return res
            .status(403)
            .send({ error: 'Provided credentials are not valid!' });
        }

        req.session.userId = userId;
        req.session.save((err) => {
          if (err) console.log(err);
        });

        res.status(200).json({ message: 'success' });
      }
    );

    this._router.post('/logout', async (req: Request, res: Response) => {
      req.session.destroy((err) => {
        if (err) {
          res.redirect('/dashboard');
        }
        res.clearCookie('mySession');
        res.redirect('/');
      });
    });
  }

  get router(): Router {
    return this._router;
  }
}
