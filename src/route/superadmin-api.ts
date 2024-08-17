import express, { Request, Response } from 'express';
import { superadminAuthMiddleware } from '../middleware/superadmin-auth-middleware';
import { SuperadminRequest } from '../type/superadmin-type';
import { AdminManagementController } from '../controller/superadmin/admin-controller';

export const superadminRoute = express.Router();

superadminRoute.use(superadminAuthMiddleware);

superadminRoute.post('/admin', AdminManagementController.create);
