import request from 'supertest';
import { DatabaseConnection } from '../../../../../src/core/infra/database/connections/connection';
import { RedisConnection } from '../../../../../src/core/infra/database/connections/redis';
import { User } from '../../../../../src/core/infra/database/entities/user.entity';
import {
  UserEntityBuilder,
  MessageEntityBuilder,
} from '../../../../core/infra/database/entities';
import { createServer } from '../../../../../src/core/presentation/server/server';
import { UpdateMessageUseCase } from '../../../../../src/features/messages/domain/usecases/update_message.usecase';

const makeUser = async () => {
  const user = await UserEntityBuilder.init().builder();
  return { user };
};

const makeMessage = async () => {
  const message = await MessageEntityBuilder.init().builder();
  return { message };
};

const makePayload = () => {
  return {
    title: 'any_title_updated',
    detail: 'any_detail_updated',
  };
};

describe('UpdateMessageController', () => {
  let app: Express.Application | undefined = undefined;

  beforeAll(async () => {
    await DatabaseConnection.initConnection();
    RedisConnection.initConnection();
    app = createServer();
  });

  afterAll(async () => {
    await DatabaseConnection.getConnection().getRepository(User).clear();
    await DatabaseConnection.closeConnection();
    RedisConnection.closeConnection();
  });

  test('Deve retornar Forbidden (403) se nao informar o authorization ', async () => {
    const uid = 'any_uid';
    await request(app).put(`/messages/${uid}`).send().expect(403);
  });

  test('Deve retornar Bad Request (400) se nao informar os dados ', async () => {
    const uid = 'any_uid';
    const { user } = await makeUser();
    await request(app)
      .put(`/messages/${uid}`)
      .set({ authorization: user.uid })
      .send()
      .expect(400);
  });

  test('Deve retornar Not Found (404) se nao encontrar uma message', async () => {
    const { user } = await makeUser();
    const payload = makePayload();
    const uid = '';
    await request(app)
      .put(`/messages/${uid}`)
      .set({ authorization: user.uid })
      .send(payload)
      .expect(404);
  });

  test('Deve retornar um ok', async () => {
    const { user } = await makeUser();
    const { message } = await makeMessage();
    const payload = makePayload();
    const uid = message.uid;
    await request(app)
      .put(`/messages/${uid}`)
      .set({ authorization: user.uid })

      .send(payload)
      .expect(200)
      .expect((response) => {
        expect(response.body.data).toBeTruthy();
        expect(response.body.data.title).toEqual(payload.title);
        expect(response.body.data.detail).toEqual(payload.detail);
      });
  });

  test('Deve retornar Server Error (500) se ocorrer erro nao tratado', async () => {
    const { user } = await makeUser();
    const { message } = await makeMessage();
    const payload = makePayload();
    const uid = message.uid;

    jest.mock(
      '../../../../../src/features/messages/domain/usecases/update_message.usecase'
    );

    jest
      .spyOn(UpdateMessageUseCase.prototype, 'execute')
      .mockRejectedValue(null);

    await request(app)
      .put(`/messages/${uid}`)
      .set({ authorization: user.uid })
      .send(payload)
      .expect(500);

    jest.restoreAllMocks();
  });
});
