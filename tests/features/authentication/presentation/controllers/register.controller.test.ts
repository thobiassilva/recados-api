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

describe("RegisterController", () => {
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
    await request(app).post("/register").send().expect(400);
  });

  test("Deve retornar Bad Request (400) se o usuario ja existir", async () => {
    const { user } = await makeUser();
    await request(app)
      .post("/register")
      .send({
        login: user.login,
        password: user.password,
      })
      .expect(400);
  });

  test("Deve retornar um ok", async () => {
    await request(app)
      .post("/register")
      .send({
        login: "new_user_login",
        password: "new_user_password",
      })
      .expect(200)
      .expect((response) => {
        expect(response.body.data).toBeTruthy();
      });
  });
});
