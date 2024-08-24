import supertest from 'supertest';
import { logger } from '../../src/application/logging';
import { web } from '../../src/application/web';
import { CustomerTest } from '../test-utils';

describe('POST customer/auth', () => {
  const baseUrl = '/v1/api/customer/auth';
  const email: string = 'customerss@yopmail.com';

  afterAll(async () => {
    await CustomerTest.delete(email);
  });
  beforeAll(async () => {
    await CustomerTest.delete(email);
  });

  it('should reject register if request is invalid', async () => {
    const response = await supertest(web).post(`${baseUrl}/register`).send({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
  it('should register if request is valid', async () => {
    const response = await supertest(web).post(`${baseUrl}/register`).send({
      firstName: 'customer',
      lastName: 'customer',
      phoneNumber: '6285161612112',
      email: email,
      password: 'customercustomer',
    });

    console.log({ err: response.body });
    expect(response.status).toBe(201);
    expect(response.body.data.email).toBe(email);
  });
  it('should register if request is valid', async () => {
    const response = await supertest(web).post(`${baseUrl}/register`).send({
      firstName: 'customer',
      lastName: 'customer',
      phoneNumber: '6285161612112',
      email: email,
      password: 'customercustomer',
    });

    logger.debug(response.body);
    expect(response.status).toBe(409);
    expect(response.body.errors).toBeDefined();
  });
  it('should login if request is valid', async () => {
    const response = await supertest(web).post(`${baseUrl}/login`).send({
      email: email,
      password: 'customer',
    });

    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});
