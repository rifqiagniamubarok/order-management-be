import supertest from 'supertest';
import { CustomerTest } from '../test-utils';
import { web } from '../../src/application/web';
import { logger } from '../../src/application/logging';

describe('POST customer/menu', () => {
  const baseUrl = '/v1/api/customer/menu';
  let token: string;

  beforeAll(async () => {
    const getToken = await CustomerTest.getToken();
    token = 'Bearer ' + getToken;
  });

  it('should reject get all menu if token is invalid', async () => {
    const response = await supertest(web).get(`${baseUrl}/`).send();

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
  it('should get all menu if request is valid', async () => {
    const response = await supertest(web).get(`${baseUrl}/`).set({ authorization: token }).send();

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
  });
});
