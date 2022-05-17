import request from "supertest";
import { DatabaseConnection } from "../../../../../src/core/infra/database/connections/connection";
import { RedisConnection } from "../../../../../src/core/infra/database/connections/redis";
import { Message, User } from "../../../../../src/core/infra/database/entities";
import { UserEntityBuilder } from "../../../../core/infra/database/entities";
import { createServer } from "../../../../../src/core/presentation/server/server";
import { CreateMessageUseCase } from "../../../../../src/features/messages/domain/usecases/create_message.usecase";

const makeUser = async () => {
  const user = await UserEntityBuilder.init().builder();
  return { user };
};

const makePayload = () => {
  return {
    title: "any_title",
    detail: "any_detail",
  };
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
    await DatabaseConnection.getConnection().getRepository(Message).clear();
    await DatabaseConnection.closeConnection();
    RedisConnection.closeConnection();
  });

  test("Deve retornar Forbidden (403) se nao informar o authorization ", async () => {
    await request(app).post("/messages").send().expect(403);
  });

  test("Deve retornar Bad Request (400) se nao informar os dados ", async () => {
    const { user } = await makeUser();
    await request(app)
      .post("/messages")
      .set({ authorization: user.uid })
      .send()
      .expect(400);
  });


  test("Deve retornar um ok", async () => {
    const { user } = await makeUser();
    const payload = makePayload();
    await request(app)
      .post("/messages")
      .set({ authorization: user.uid })
      .send(payload)
      .expect(200)
      .expect((response) => {
        expect(response.body.data).toBeTruthy();
        expect(response.body.data.title).toEqual(payload.title);
        expect(response.body.data.detail).toEqual(payload.detail);
      });
  });
  
  test("Deve retornar Server Error (500) se ocorrer erro nao tratado", async () => {
    const { user } = await makeUser();
    const payload = makePayload();

    jest.mock('../../../../../src/features/messages/domain/usecases/create_message.usecase');

    jest.spyOn(CreateMessageUseCase.prototype, 'execute').mockRejectedValue(null);

    await request(app)
      .post("/messages")
      .set({ authorization: user.uid })
      .send(payload)
      .expect(500);

      jest.restoreAllMocks();
  });
});
