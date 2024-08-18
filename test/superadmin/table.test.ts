import supertest from 'supertest';
import { web } from '../../src/application/web';
import { logger } from '../../src/application/logging';
import { SuperadminTest, TableTest } from '../test-utils';

describe('POST superadmin/admin', () => {
  afterAll(async () => {
    await TableTest.delete();
  });

  const authBaseUrl = '/v1/api/superadmin/auth';
  const baseUrl = '/v1/api/superadmin/table';
  let token = '';
  let id = '';

  it('should reject create table if no authorization', async () => {
    const response = await supertest(web).post(`${baseUrl}`).send({
      number: '',
      desc: '',
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it('should login admin', async () => {
    const response = await supertest(web).post(`${authBaseUrl}/login`).send({
      email: 'superadmin@yopmail.com',
      password: 'Superadmin',
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.email).toBe('superadmin@yopmail.com');
    expect(response.body.data.role).toBe('SUPERADMIN');
    expect(response.body.data.token).toBeDefined();
    token = response.body.data.token;
  });

  it('should reject create table if request invalid', async () => {
    const response = await supertest(web)
      .post(`${baseUrl}`)
      .set({ authorization: 'Bearer ' + token })
      .send({
        number: '',
        desc: '',
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should reject create table if request invalid', async () => {
    const response = await supertest(web)
      .post(`${baseUrl}`)
      .set({ authorization: 'Bearer ' + token })
      .send({
        number: 1,
        desc: '',
      });

    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.data.number).toBe(1);
  });
});
