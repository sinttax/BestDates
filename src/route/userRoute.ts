import { Router } from 'express';
import { AuthController } from '../controller/authController';
import { UserController } from '../controller/userControllers';
import { NavigationController } from '../controller/navigationController';
import { UserRepository } from '../repository/userRepository';
import { UserService } from '../service/user/userService';

const userRouter = Router();
const authRouter = Router();
const navigationRouter = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const navigationController = new NavigationController();
const userController = new UserController(userService);
const authController = new AuthController(userService);

navigationRouter.use('', navigationController.router);
userRouter.use('/api', userController.router);
authRouter.use('/auth', authController.router);

export { userRouter, authRouter, navigationRouter };
