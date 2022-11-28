import { Response, Request, NextFunction } from 'express';

export const redirectUnauthorized = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.userId) {
    res.redirect('/');
  } else {
    next();
  }
};

export const redirectAuthorized = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.userId) {
    res.redirect('/dashboard');
  } else {
    next();
  }
};
