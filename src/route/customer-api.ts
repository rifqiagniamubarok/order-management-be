import express, { Request, Response } from 'express';
import { CustomerAuthMiddleware } from '../middleware/customer-auth-middleware';
import { MenuController } from '../controller/customer/menu-controller';

export const customerRoute = express.Router();

customerRoute.use(CustomerAuthMiddleware);

// Menu
customerRoute.get('/menu', MenuController.getAll);
customerRoute.get('/menu/:id(\\d+)', MenuController.getDetail);
