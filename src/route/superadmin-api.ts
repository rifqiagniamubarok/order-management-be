import express, { Request, Response } from 'express';
import { superadminAuthMiddleware } from '../middleware/superadmin-auth-middleware';
import { SuperadminRequest } from '../type/superadmin-type';
import { AdminManagementController } from '../controller/superadmin/admin-controller';
import { TableManagementController } from '../controller/superadmin/table-controller';

export const superadminRoute = express.Router();

superadminRoute.use(superadminAuthMiddleware);

// Admin Management
superadminRoute.post('/admin', AdminManagementController.create);
superadminRoute.get('/admin', AdminManagementController.getAll);
superadminRoute.get('/admin/:id(\\d+)', AdminManagementController.getDetail);
superadminRoute.put('/admin/:id(\\d+)', AdminManagementController.edit);

// Table Management
superadminRoute.post('/table', TableManagementController.create);
