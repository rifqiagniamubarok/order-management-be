import { OAS3Definition } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import docPaths from '../../doc/swaggerPaths';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;

const swaggerDocument: swaggerUi.JsonObject = {
  openapi: '3.0.0',
  info: {
    title: 'Order Management API Documentation',
    version: '1.0.0',
    description: 'API Documentation for order management',
  },
  servers: [
    {
      url: `http://localhost:${port}`,
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: { ...docPaths },
};

export function setupSwagger(app: Express): void {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
