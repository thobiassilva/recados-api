import request from "supertest";
import { DatabaseConnection } from "../../../../../src/core/infra/database/connections/connection";
import { RedisConnection } from "../../../../../src/core/infra/database/connections/redis";
import { User } from "../../../../../src/core/infra/database/entities/user.entity";
import { UserEntityBuilder } from "../../../../core/infra/database/entities/user_entity.builder";
import { createServer } from "../../../../../src/core/presentation/server/server";

const makeUser = async () => {
  const user = await UserEntityBuilder.init().builder();
  return { user };
};

describe("LoginController", () => {
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

  test("Deve retornar Bad Request (400) se nao informar os dados ", async () => {
    await request(app).post("/login").send().expect(400);
  });

  test("Deve retornar Not Found (404) se nao encontrar o usuario ", async () => {
    await makeUser();
    await request(app)
      .post("/login")
      .send({
        login: "any_user_login",
        password: "any_user_password",
      })
      .expect(404);
  });

  test("Deve retornar um ok", async () => {
    const { user } = await makeUser();
    await request(app)
      .post("/login")
      .send({
        login: user.login,
        password: user.password,
      })
      .expect(200)
      .expect((response) => {
        expect(response.body.data).toEqual(user.uid);
      });
  });
});
