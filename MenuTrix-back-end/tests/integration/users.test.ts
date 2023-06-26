import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createUser } from '../factories/users-factory';
import { cleanDb } from '../helpers';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
  await cleanDb();
});

beforeEach(async () => {
  await cleanDb();
});
const server = supertest(app);

describe('POST /sign-up', () => {
  //teste
  //teste2
  it('should respond with status 400 when body is not given', async () => {
    const response = await server.post('/sign-up');

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 400 when body is not valid', async () => {
    const invalidBody = { [faker.word.adjective()]: faker.word.adjective() };

    const response = await server.post('/sign-up').send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe('when body is valid', () => {
    const generateValidBody = () => ({
      cpf: '11111111111',
      name: faker.fake.name,
      email: faker.internet.email(),
      password: '123456',
      repeatPassword: '123456',
    });

    it('should respond with status 409 when there is an user with given email', async () => {
      const body = generateValidBody();
      await createUser(body);

      const response = await server.post('/sign-up').send(body);

      expect(response.status).toBe(httpStatus.CONFLICT);
    });

    it('should respond with status 201 and create user when given email is unique', async () => {
      const body = generateValidBody();

      const response = await server.post('/sign-up').send(body);

      expect(response.status).toBe(httpStatus.CREATED);
    });
  });
});
