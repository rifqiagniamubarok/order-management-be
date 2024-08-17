import express from 'express';
import { UserController } from '../controller/user-controller';
import { AuthController } from '../controller/superadmin/auth-controller';

export const publicRouter = express.Router();

publicRouter.post('/auth/register', UserController.register);
publicRouter.post('/auth/login', UserController.login);

publicRouter.post('/superadmin/auth/login', AuthController.login);
