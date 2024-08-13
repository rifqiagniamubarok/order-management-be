import supertest from 'supertest';
import { web } from '../src/application/web';
import { logger } from '../src/application/logging';
import { UserTest } from './test-utils';

describe('POST /api/users', () => {
  afterAll(async () => {
    await UserTest.delete();
  });
  it('should reject register new user if request is invalid', async () => {
    const response = await supertest(web).post('/v1/api/auth/register').send({
      name: '',
      username: '',
      password: '',
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should register new user', async () => {
    const response = await supertest(web).post('/v1/api/auth/register').send({
      name: 'test',
      username: 'test',
      password: 'test',
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe('test');
    expect(response.body.data.name).toBe('test');
  });

  it('should reject login user if request is invalid', async () => {
    const response = await supertest(web).post('/v1/api/auth/login').send({
      username: '',
      password: '',
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should login user', async () => {
    const response = await supertest(web).post('/v1/api/auth/login').send({
      username: 'test',
      password: 'test',
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe('test');
    expect(response.body.data.username).toBe('test');
    expect(response.body.data.token).toBeDefined();
  });

  it('should fail login user because already exist', async () => {
    const response = await supertest(web).post('/v1/api/auth/register').send({
      username: 'test',
      password: 'test',
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});
