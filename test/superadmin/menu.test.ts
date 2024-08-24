import supertest from 'supertest';
import { MenuTest, SuperadminTest } from '../test-utils';
import { web } from '../../src/application/web';
import { logger } from '../../src/application/logging';

describe('POST superadmin/menu', () => {
  const baseUrl = '/v1/api/superadmin/menu';
  let token = '';
  let id: number;
  let idOption: number;
  let idOptionItem: number;
  let idForNotFound: number = 1000;

  beforeAll(async () => {
    const getToken = await SuperadminTest.getToken();
    if (getToken) {
      token = getToken;
    }
    await MenuTest.delete(idForNotFound);
    await MenuTest.deleteOption(idForNotFound);
  });

  afterAll(async () => {
    await MenuTest.delete(id);
    await MenuTest.deleteOption(idOption);
    await MenuTest.deleteOptionItem(idOptionItem);
  });

  it('should reject create table if no authorization', async () => {
    const response = await supertest(web).post(`${baseUrl}`).send({
      name: '',
      price: '',
      isAvailable: '',
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
        name: '',
        price: '',
        isAvailable: '',
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
        name: 'Bakso',
        price: -50000,
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
        name: 'Bakso',
        price: 50000,
      });

    logger.debug(response.body);
    expect(response.status).toBe(201);
    expect(response.body.data.name).toBe('Bakso');
    id = response.body.data.id;
  });

  it('should get all table if request valid', async () => {
    const response = await supertest(web)
      .get(`${baseUrl}`)
      .set({ authorization: 'Bearer ' + token })
      .send();

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(1);
  });

  it('should create table if request valid', async () => {
    const response = await supertest(web)
      .get(`${baseUrl}/${idForNotFound}`)
      .set({ authorization: 'Bearer ' + token })
      .send();

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
  it('should create table if request valid', async () => {
    const response = await supertest(web)
      .post(`${baseUrl}/option`)
      .set({ authorization: 'Bearer ' + token })
      .send({
        menuId: id,
        name: 'Which sausage?',
      });

    logger.error(response.body);
    expect(response.status).toBe(201);
    expect(response.body.data.name).toBe('Which sausage?');
    idOption = response.body.data.id;
  });
  it('should error table if id menu invalid', async () => {
    const response = await supertest(web)
      .post(`${baseUrl}/option`)
      .set({ authorization: 'Bearer ' + token })
      .send({
        menuId: idForNotFound,
        name: 'Which sausage?',
      });

    logger.error(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
  it('should edit table if request valid', async () => {
    const response = await supertest(web)
      .put(`${baseUrl}/option/${idOption}`)
      .set({ authorization: 'Bearer ' + token })
      .send({
        menuId: id,
        name: 'Extra?',
      });

    logger.error(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe('Extra?');
  });
  it('should error edit menu option if id menu invalid', async () => {
    const response = await supertest(web)
      .put(`${baseUrl}/option/${idForNotFound}`)
      .set({ authorization: 'Bearer ' + token })
      .send({
        name: 'Which sausage?',
      });

    logger.error(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
  it('should add menu option item if request valid', async () => {
    const response = await supertest(web)
      .post(`${baseUrl}/option/item`)
      .set({ authorization: 'Bearer ' + token })
      .send({
        menuOptionId: idOption,
        name: 'rice',
      });

    logger.error(response.body);
    expect(response.status).toBe(201);
    expect(response.body.data.name).toBe('rice');
    expect(response.body.data.idDefault).toBeFalsy();
    idOptionItem = response.body.data.id;
  });
});
