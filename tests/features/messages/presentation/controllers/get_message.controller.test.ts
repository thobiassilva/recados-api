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

describe("GetMessagesController", () => {
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
    await request(app).get("/messages").send().expect(403);
  });

  test("Deve retornar um ok", async () => {
    const { user } = await makeUser();
    const { message } = await makeMessage();
    await request(app)
      .get("/messages")
      .set({ authorization: user.uid })
      .send()
      .expect(200)
      .expect((response) => {
        expect(response.body.data).toBeTruthy();
        expect(response.body.data[0].title).toEqual(message.title);
        expect(response.body.data[0].detail).toEqual(message.detail);
      });
  });
});
