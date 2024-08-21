import supertest from 'supertest';
import { web } from '../../src/application/web';
import { logger } from '../../src/application/logging';
import { SuperadminTest, TableTest } from '../test-utils';

describe('POST superadmin/table', () => {
  const baseUrl = '/v1/api/superadmin/table';
  let token = '';
  let id = '';

  beforeAll(async () => {
    await TableTest.deleteBefore();
    const getToken = await SuperadminTest.getToken();
    if (getToken) {
      token = getToken;
    }
  });
  afterAll(async () => {
    await TableTest.delete();
  });

  it('should reject create table if no authorization', async () => {
    const response = await supertest(web).post(`${baseUrl}`).send({
      number: '',
      desc: '',
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
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

  it('should create table if request valid', async () => {
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
    id = response.body.data.id;
  });

  it('should get all table', async () => {
    const response = await supertest(web)
      .get(`${baseUrl}`)
      .set({ authorization: 'Bearer ' + token })
      .send();

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it('should get detail table', async () => {
    const response = await supertest(web)
      .get(`${baseUrl}/${id}`)
      .set({ authorization: 'Bearer ' + token })
      .send();

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(id);
  });

  it('should get 404 because invalid params table id', async () => {
    const response = await supertest(web)
      .get(`${baseUrl}/1000`)
      .set({ authorization: 'Bearer ' + token })
      .send({
        desc: 'table number 1',
      });

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it('should edit table', async () => {
    const response = await supertest(web)
      .put(`${baseUrl}/${id}`)
      .set({ authorization: 'Bearer ' + token })
      .send({
        desc: 'table number 1',
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.desc).toBe('table number 1');
  });

  it('should get 404 because invalid params table id', async () => {
    const response = await supertest(web)
      .put(`${baseUrl}/1000`)
      .set({ authorization: 'Bearer ' + token })
      .send({
        desc: 'table number 1',
      });

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it('should get 404 because invalid params table id', async () => {
    const response = await supertest(web)
      .delete(`${baseUrl}/1000`)
      .set({ authorization: 'Bearer ' + token })
      .send();

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it('should delete table ', async () => {
    const response = await supertest(web)
      .delete(`${baseUrl}/${id}`)
      .set({ authorization: 'Bearer ' + token })
      .send();

    logger.debug(response);
    expect(response.status).toBe(204);
  });
});
