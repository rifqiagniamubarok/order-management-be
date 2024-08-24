import express from 'express';
import { publicRouter } from '../route/public-api';
import { errorMiddleware } from '../middleware/error-middleware';
import { setupSwagger } from './swagger';
import { superadminRoute } from '../route/superadmin-api';
import { customerRoute } from '../route/customer-api';

export const web = express();

web.use(express.json());
setupSwagger(web);

web.use('/v1/api', publicRouter);
web.use('/v1/api/superadmin', superadminRoute);
web.use('/v1/api/customer', customerRoute);
web.use(errorMiddleware);
