import express, { Request, Response } from 'express';
import { superadminAuthMiddleware } from '../middleware/superadmin-auth-middleware';
import { SuperadminRequest } from '../type/superadmin-type';

export const superadminRoute = express.Router();

superadminRoute.use(superadminAuthMiddleware);

superadminRoute.get('/admin', async (req: SuperadminRequest, res: Response) => {
  try {
    const user = req.admin;
    res.json({ ok: user });
  } catch (error) {
    res.json({ error });
  }
});
