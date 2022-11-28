import { Router, Response, Request } from 'express';
import { UserService } from '../service/user/userService';

export class UserController {
  private readonly _router: Router = Router();

  constructor(private userService: UserService) {
    this._router.get('/users', async (req: Request, res: Response) => {
      const myId = req.session.userId;
      res.json(await this.userService.listUsers(myId));
    });

    this._router.get('/user/:id', async (req: Request, res: Response) => {
      res.json(await this.userService.findUserById(+req.params.id));
    });

    this._router.get('/myprofile', async (req: Request, res: Response) => {
      if (!req.session.userId) {
        res.json({ message: 'User not logged in' });
      }
      res.json(await this.userService.findOwnProfile(req.session.userId));
    });
  }

  get router(): Router {
    return this._router;
  }
}
