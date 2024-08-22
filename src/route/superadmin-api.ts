import express, { Request, Response } from 'express';
import { superadminAuthMiddleware } from '../middleware/superadmin-auth-middleware';
import { SuperadminRequest } from '../type/superadmin-type';
import { AdminManagementController } from '../controller/superadmin/admin-controller';
import { TableManagementController } from '../controller/superadmin/table-controller';
import { MenuManagementController } from '../controller/superadmin/menu-controller';

export const superadminRoute = express.Router();

superadminRoute.use(superadminAuthMiddleware);

// Admin Management
superadminRoute.post('/admin', AdminManagementController.create);
superadminRoute.get('/admin/:id(\\d+)', AdminManagementController.getDetail);
superadminRoute.put('/admin/:id(\\d+)', AdminManagementController.edit);
superadminRoute.get('/admin', AdminManagementController.getAll);

// Table Management
superadminRoute.post('/table', TableManagementController.create);
superadminRoute.get('/table/:id(\\d+)', TableManagementController.getDetail);
superadminRoute.put('/table/:id(\\d+)', TableManagementController.edit);
superadminRoute.delete('/table/:id(\\d+)', TableManagementController.delete);
superadminRoute.get('/table', TableManagementController.getAll);

// Menu Management
superadminRoute.post('/menu', MenuManagementController.create);
superadminRoute.get('/menu/:id(\\d+)', MenuManagementController.getDetail);
superadminRoute.get('/menu', MenuManagementController.getAll);
