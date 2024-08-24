import supertest from 'supertest';
import { web } from '../../src/application/web';
import { logger } from '../../src/application/logging';
import { AdminTest, SuperadminTest } from '../test-utils';

describe('POST superadmin/admin', () => {
  afterAll(async () => {
    await AdminTest.delete();
    await SuperadminTest.delete();
  });

  const authBaseUrl = '/api/v1/superadmin/auth';
  const baseUrl = '/api/v1/superadmin/admin';
  let token = '';
  let id = '';

  it('should reject create admin if no authorization', async () => {
    const response = await supertest(web).post(`${baseUrl}`).send({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      role: '',
      email: '',
      password: '',
      isActive: '',
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

  it('should reject create admin if request is invalid', async () => {
    const response = await supertest(web)
      .post(`${baseUrl}`)
      .set({ authorization: 'Bearer ' + token })
      .send({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        role: '',
        email: '',
        password: '',
        isActive: '',
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should  create admin if request is true', async () => {
    const response = await supertest(web)
      .post(`${baseUrl}`)
      .set({ authorization: 'Bearer ' + token })
      .send({
        firstName: 'admin',
        lastName: 'test',
        phoneNumber: '6285190902323',
        role: 'ADMIN',
        email: 'testadmin@yopmail.com',
        password: 'adminadmin',
        isActive: true,
      });

    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.data.firstName).toBe('admin');
    expect(response.body.data.lastName).toBe('test');
    expect(response.body.data.role).toBe('ADMIN');
    expect(response.body.data.phoneNumber).toBe('6285190902323');
    expect(response.body.data.email).toBe('testadmin@yopmail.com');

    id = response.body.data.id;
  });

  it('should  create super admin if request is true', async () => {
    const response = await supertest(web)
      .post(`${baseUrl}`)
      .set({ authorization: 'Bearer ' + token })
      .send({
        firstName: 'superadmin',
        lastName: 'test',
        phoneNumber: '6285190902324',
        role: 'SUPERADMIN',
        email: 'testsuperadmin@yopmail.com',
        password: 'adminadmin',
        isActive: true,
      });

    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.data.firstName).toBe('superadmin');
    expect(response.body.data.lastName).toBe('test');
    expect(response.body.data.role).toBe('SUPERADMIN');
    expect(response.body.data.phoneNumber).toBe('6285190902324');
    expect(response.body.data.email).toBe('testsuperadmin@yopmail.com');
  });

  it('should get all admin ', async () => {
    const response = await supertest(web)
      .get(`${baseUrl}`)
      .set({ authorization: 'Bearer ' + token });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it('should get detail admin ', async () => {
    const response = await supertest(web)
      .get(`${baseUrl}/${id}`)
      .set({ authorization: 'Bearer ' + token });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(id);
  });

  it('should  update admin if request is true', async () => {
    const response = await supertest(web)
      .put(`${baseUrl}/${id}`)
      .set({ authorization: 'Bearer ' + token })
      .send({
        firstName: 'admin',
        lastName: 'test2',
        phoneNumber: '6285190902323',
        role: 'ADMIN',
        email: 'testadmin@yopmail.com',
        password: 'adminadmin',
        isActive: true,
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(id);
    expect(response.body.data.firstName).toBe('admin');
    expect(response.body.data.lastName).toBe('test2');
    expect(response.body.data.role).toBe('ADMIN');
    expect(response.body.data.phoneNumber).toBe('6285190902323');
    expect(response.body.data.email).toBe('testadmin@yopmail.com');

    id = response.body.data.id;
  });
});
