import request from "supertest";
import { DatabaseConnection } from "../../../../../src/core/infra/database/connections/connection";
import { RedisConnection } from "../../../../../src/core/infra/database/connections/redis";
import { User } from "../../../../../src/core/infra/database/entities/user.entity";
import { UserEntityBuilder } from "../../../../core/infra/database/entities";
import { app } from "../../../../../src/core/presentation/server/server";

const makeUser = async () => {
  const user = await UserEntityBuilder.init().builder();
  return { user };
};

describe("LoginController", () => {
  beforeAll(async () => {
    await DatabaseConnection.initConnection();
    RedisConnection.initConnection();
  });

  afterAll(async () => {
    await DatabaseConnection.getConnection().getRepository(User).clear();
    await DatabaseConnection.closeConnection();
    RedisConnection.closeConnection();
  });

  test("deveria retornar badRequest (400) se nao informar os dados ", async () => {
    await request(app).post("/login").query({}).expect(400);
  });

  //   test("deveria retornar ok", async () => {
  //     const { project, user } = await makeProject();

  //     //project.user = undefined;
  //     await request(app)
  //       .get("/project/find")
  //       .query({ id: project.uid })
  //       .expect((response) => {
  //         expect(response.status).toEqual(200);
  //         expect(response.body.ok).toEqual(true);
  //       });
  //   });
});
