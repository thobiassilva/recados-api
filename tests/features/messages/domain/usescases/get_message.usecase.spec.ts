import {
  CreateMessageUseCase,
  GetMessagesUseCase,
} from "../../../../../src/features/messages/domain/usecases";
import { IMessageRepository } from "../../../../../src/features/messages/domain/contracts/message_repository.contract";
import { IMessage } from "../../../../../src/features/messages/domain/models/message.model";
import { MessageBuilder } from "../../../../builders/";
import { CreateMessageParams } from "../../../../../src/features/messages/domain/models/create_message.params";
import { ICacheRepository } from "../../../../../src/core/domain/contracts/cache_repository.contract";
import { UidParams } from "../../../../../src/features/messages/domain/models/uid.params";

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
      return [MessageBuilder.init().builder()] as unknown as T;
    }
    async delete(key: string): Promise<void> {}
  }

  return new MockCacheRepository();
};

const makeParams = (): UidParams => {
  return {
    uid: "any_uid",
  };
};

const makeSut = () => {
  const repository = mockMessageRepository();
  const cache = mockCacheRepository();
  const sut = new GetMessagesUseCase(repository, cache);
  return { sut, repository, cache };
};

describe("GetMessagesUseCase", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Deve chamar o MessageRepository e CacheRepository com os parametros corretos", async () => {
    const { sut, repository, cache } = makeSut();
    const repositorySpy = jest.spyOn(repository, "list");
    const cacheSpyGet = jest.spyOn(cache, "get").mockResolvedValue(undefined);
    const cacheSpySet = jest.spyOn(cache, "set");
    const params = makeParams();
    await sut.execute(params);
    expect(repositorySpy).toHaveBeenCalledWith(params.uid);
    expect(cacheSpyGet).toHaveBeenCalledWith(`message-${params.uid}:all`);
    expect(cacheSpySet).toHaveBeenCalledWith(`message-${params.uid}:all`, [
      MessageBuilder.init().builder(),
    ]);
  });

  test("Deve retornar uma lista com uma Message", async () => {
    const { sut } = makeSut();
    const params = makeParams();
    const result = await sut.execute(params);
    expect(result).toBeTruthy();
    expect(result.length).toEqual(1);
    expect(result).toMatchObject([MessageBuilder.init().builder()]);
  });
});
