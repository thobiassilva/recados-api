import {
  CreateMessageUseCase,
  UpdateMessageUseCase,
} from "../../../../../src/features/messages/domain/usecases";
import { IMessageRepository } from "../../../../../src/features/messages/domain/contracts/message_repository.contract";
import { IMessage } from "../../../../../src/features/messages/domain/models/message.model";
import { MessageBuilder } from "../../../../builders/";
import { CreateMessageParams } from "../../../../../src/features/messages/domain/models/create_message.params";
import { ICacheRepository } from "../../../../../src/core/domain/contracts/cache_repository.contract";
import { UpdateMessageParams } from "../../../../../src/features/messages/domain/models/update_message.params";
import { NotFoundFailure } from "../../../../../src/core/domain/errors/errors";
import { UpdateMessageFailure } from "../../../../../src/features/messages/domain/errors/errors";

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

const makeParams = (): UpdateMessageParams => {
  return {
    uid: "any_uid",
    title: "any_title",
    detail: "any_detail",
    userUid: "any_userUid",
  };
};

const makeSut = () => {
  const repository = mockMessageRepository();
  const cache = mockCacheRepository();
  const sut = new UpdateMessageUseCase(repository, cache);
  return { sut, repository, cache };
};

describe("UpdateMessageUseCase", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Deve chamar o MessageRepository e CacheRepository com os parametros corretos", async () => {
    const { sut, repository, cache } = makeSut();
    const repositorySpyFind = jest.spyOn(repository, "find");
    const repositorySpyUpdate = jest.spyOn(repository, "update");
    const cacheSpy = jest.spyOn(cache, "delete");
    const params = makeParams();
    await sut.execute(params);
    expect(repositorySpyFind).toHaveBeenCalledWith(params.uid);
    expect(repositorySpyUpdate).toHaveBeenCalledWith({
      uid: params.uid,
      title: params.title,
      detail: params.detail,
      userUid: params.userUid,
    });
    expect(cacheSpy).toHaveBeenCalledWith(`message-${params.userUid}:all`);
  });

  test("Deve retornar um NotFoundError se não encontrar a mensagem", async () => {
    const { sut, repository, cache } = makeSut();
    const params = makeParams();
    jest.spyOn(repository, "find").mockResolvedValue(undefined);
    await expect(sut.execute(params)).rejects.toThrow(
      new NotFoundFailure("Mensagem")
    );

    const cacheSpy = jest.spyOn(cache, "delete");
    expect(cacheSpy).not.toBeCalled();
  });

  test("Deve retornar um UpdateMessageFailure quando o repository retornar false", async () => {
    const { sut, repository, cache } = makeSut();
    const params = makeParams();
    jest.spyOn(repository, "update").mockResolvedValue(false);
    await expect(sut.execute(params)).rejects.toThrow(
      new UpdateMessageFailure()
    );
    const cacheSpy = jest.spyOn(cache, "delete");
    expect(cacheSpy).not.toBeCalled();
  });

  test("Deve retornar uma Message", async () => {
    const { sut } = makeSut();
    const params = makeParams();
    const result = await sut.execute(params);
    expect(result).toBeTruthy();
    expect(result).toMatchObject(MessageBuilder.init().builder());
  });
});
