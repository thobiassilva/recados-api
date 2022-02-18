import { CreateMessageUseCase } from "../../../../../src/features/messages/domain/usecases";
import { IMessageRepository } from "../../../../../src/features/messages/domain/contracts/message_repository.contract";
import { IMessage } from "../../../../../src/features/messages/domain/models/message.model";
import { MessageBuilder } from "../../../../builders/";
import { CreateMessageParams } from "../../../../../src/features/messages/domain/models/create_message.params";
import { ICacheRepository } from "../../../../../src/core/domain/contracts/cache_repository.contract";

const mockMessageRepository = (): IMessageRepository => {
  class MockMessageRepository implements IMessageRepository {
    async list(userUid: string): Promise<IMessage[]> {
      return [MessageBuilder.init().builder()];
    }
    async create(message: IMessage): Promise<IMessage> {
      return MessageBuilder.init().builder();
    }
    async find(uid: string): Promise<IMessage> {
      return MessageBuilder.init().builder();
    }
    async update(message: IMessage): Promise<boolean> {
      return true;
    }
    async delete(uid: string): Promise<void> {}
  }
  return new MockMessageRepository();
};

const mockCacheRepository = (): ICacheRepository => {
  class MockCacheRepository implements ICacheRepository {
    async set(key: string, value: any): Promise<void> {}
    async get<T>(key: string): Promise<T> {
      throw Error();
    }
    async delete(key: string): Promise<void> {}
  }

  return new MockCacheRepository();
};

const makeParams = (): CreateMessageParams => {
  return {
    title: "any_title",
    detail: "any_detail",
    userUid: "any_userUid",
  };
};

const makeSut = () => {
  const repository = mockMessageRepository();
  const cache = mockCacheRepository();
  const sut = new CreateMessageUseCase(repository, cache);
  return { sut, repository, cache };
};

describe("CreateMessageUseCase", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Deve chamar o MessageRepository e CacheRepository com os parametros corretos", async () => {
    const { sut, repository, cache } = makeSut();
    const repositorySpy = jest.spyOn(repository, "create");
    const cacheSpy = jest.spyOn(cache, "delete");
    const params = makeParams();
    await sut.execute(params);
    expect(repositorySpy).toBeCalled();
    expect(cacheSpy).toHaveBeenCalledWith(`message-${params.userUid}:all`);
  });

  test("Deve retornar uma Message", async () => {
    const { sut } = makeSut();
    const params = makeParams();
    const result = await sut.execute(params);
    expect(result).toBeTruthy();
    expect(result).toMatchObject(MessageBuilder.init().builder());
  });
});
