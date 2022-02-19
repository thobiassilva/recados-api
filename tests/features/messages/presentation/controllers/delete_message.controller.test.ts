import request from "supertest";
import { DatabaseConnection } from "../../../../../src/core/infra/database/connections/connection";
import { RedisConnection } from "../../../../../src/core/infra/database/connections/redis";
import { Message, User } from "../../../../../src/core/infra/database/entities";
import {
  UserEntityBuilder,
  MessageEntityBuilder,
} from "../../../../core/infra/database/entities";
import { createServer } from "../../../../../src/core/presentation/server/server";

const makeUser = async () => {
  const user = await UserEntityBuilder.init().builder();
  return { user };
};

const makeMessage = async () => {
  const message = await MessageEntityBuilder.init().builder();
  return { message };
};

describe("DeleteMessageController", () => {
  let app: Express.Application | undefined = undefined;

  beforeAll(async () => {
    await DatabaseConnection.initConnection();
    RedisConnection.initConnection();
    app = createServer();
  });

  afterAll(async () => {
    await DatabaseConnection.getConnection().getRepository(User).clear();
    await DatabaseConnection.getConnection().getRepository(Message).clear();
    await DatabaseConnection.closeConnection();
    RedisConnection.closeConnection();
  });

  test("Deve retornar Forbidden (403) se nao informar o authorization ", async () => {
    const uid = "any_uid";
    await request(app).delete(`/messages/${uid}`).send().expect(403);
  });

  test("Deve retornar Not Found (404) se nao encontrar uma message ", async () => {
    const { user } = await makeUser();
    const uid = "";
    await request(app)
      .delete(`/messages/${uid}`)
      .set({ authorization: user.uid })
      .send()
      .expect(404);
  });

  test("Deve retornar um ok", async () => {
    const { user } = await makeUser();
    const { message } = await makeMessage();
    const uid = message.uid;
    await request(app)
      .delete(`/messages/${uid}`)
      .set({ authorization: user.uid })
      .send()
      .expect(200);
  });

  // test("Deve retornar Server Error (500) se ocorrer erro nao tratado", async () => {
  //   const uid = "any_uid";
  //   await request(app)
  //     .delete(`/messages/${uid}`)
  //     .set({ authorization: uid})
  //     .send()
  //     .expect(500);
  // });
});
