import { Router, Response, Request } from 'express';
import {
  redirectUnauthorized,
  redirectAuthorized,
} from '../middlewares/auth-middleware';

export class NavigationController {
  private readonly _router: Router = Router();

  constructor() {
    this._router.get('/', redirectAuthorized, (req: Request, res: Response) => {
      res.render('index');
    });

    this._router.get(
      '/registration',
      redirectAuthorized,
      (req: Request, res: Response) => {
        res.render('registration');
      }
    );

    this._router.get(
      '/dashboard',
      redirectUnauthorized,
      (req: Request, res: Response) => {
        res.render('dashboard');
      }
    );

    this._router.get(
      '/:id',
      redirectUnauthorized,
      (req: Request, res: Response) => {
        res.render('profile');
      }
    );
  }

  get router(): Router {
    return this._router;
  }
}
