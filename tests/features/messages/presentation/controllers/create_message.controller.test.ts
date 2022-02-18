import request from "supertest";
import { DatabaseConnection } from "../../../../../src/core/infra/database/connections/connection";
import { RedisConnection } from "../../../../../src/core/infra/database/connections/redis";
import { User } from "../../../../../src/core/infra/database/entities/user.entity";
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

describe("CreateMessageController", () => {
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

  test("Deve retornar Forbidden (403) se nao informar o authorization ", async () => {
    await request(app).post("/message/").send().expect(403);
  });

  test("Deve retornar Bad Request (400) se nao informar os dados ", async () => {
    const { user } = await makeUser();
    await request(app)
      .post("/message/")
      .send()
      .set({ authorization: user.uid })
      .expect(400);
  });

  test("Deve retornar um ok", async () => {
    const { user } = await makeUser();
    await request(app)
      .post("/message/")
      .set({ authorization: user.uid })
      .send({
        title: "any_title",
        detail: "any_detail",
      })
      .expect(200)
      .expect((response) => {
        expect(response.body.data).toBeTruthy();
      });
  });
});
