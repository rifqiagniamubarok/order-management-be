import express from 'express';
import { UserController } from '../controller/user-controller';
import { AuthController } from '../controller/superadmin/auth-controller';
import { AuthCustomerController } from '../controller/customer/auth-controller';

export const publicRouter = express.Router();

publicRouter.post('/auth/register', UserController.register);
publicRouter.post('/auth/login', UserController.login);

// Superadmin
publicRouter.post('/superadmin/auth/login', AuthController.login);

// Customer
publicRouter.post('/customer/auth/register', AuthCustomerController.register);
publicRouter.post('/customer/auth/login', AuthCustomerController.login);
