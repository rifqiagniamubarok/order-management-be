import express from 'express';
import { publicRouter } from '../route/public-api';
import { errorMiddleware } from '../middleware/error-middleware';
import { setupSwagger } from './swagger';
import { superadminRoute } from '../route/superadmin-api';

export const web = express();

web.use(express.json());
setupSwagger(web);

web.use('/v1/api', publicRouter);
web.use('/v1/api/superadmin', superadminRoute);
web.use(errorMiddleware);
