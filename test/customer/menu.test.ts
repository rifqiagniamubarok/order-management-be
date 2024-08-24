import supertest from 'supertest';
import { CustomerTest } from '../test-utils';
import { web } from '../../src/application/web';
import { logger } from '../../src/application/logging';

describe('POST customer/menu', () => {
  const baseUrl = '/api/v1/customer/menu';
  let token: string;
  let id: number;

  beforeAll(async () => {
    const getToken = await CustomerTest.getToken();
    console.log({ getToken });
    token = 'Bearer ' + getToken;
  });

  it('should reject get all menu if token is invalid', async () => {
    const response = await supertest(web).get(`${baseUrl}`).send();

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
  it('should get all menu if request is valid', async () => {
    const response = await supertest(web).get(`${baseUrl}`).set({ authorization: token }).send();

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    id = response.body.data[0].id;
  });
  it('should get detail menu if request is valid', async () => {
    const response = await supertest(web).get(`${baseUrl}/${id}`).set({ authorization: token }).send();

    logger.debug(response.body);
    console.log({ res: response.body });
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(id);
  });
});
