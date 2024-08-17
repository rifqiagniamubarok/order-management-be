import supertest from 'supertest';
import { logger } from '../../src/application/logging';
import { web } from '../../src/application/web';

describe('POST superadmin/auth', () => {
  const baseUrl = '/v1/api/superadmin/auth';
  it('should reject login admin if request is invalid', async () => {
    const response = await supertest(web).post(`${baseUrl}/login`).send({
      email: '',
      password: '',
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should reject login admin if password is wrong', async () => {
    const response = await supertest(web).post(`${baseUrl}/login`).send({
      email: 'superadmin@yopmail.com',
      password: 'xxxx',
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should login admin', async () => {
    const response = await supertest(web).post(`${baseUrl}/login`).send({
      email: 'superadmin@yopmail.com',
      password: 'Superadmin',
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.email).toBe('superadmin@yopmail.com');
    expect(response.body.data.role).toBe('SUPERADMIN');
    expect(response.body.data.token).toBeDefined();
  });
});
