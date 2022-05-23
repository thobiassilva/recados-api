import { DeleteMessageUseCase } from "../../../../../src/features/messages/domain/usecases/delete_message.usecase";
import { IMessageRepository } from "../../../../../src/features/messages/domain/contracts/message_repository.contract";
import { IMessage } from "../../../../../src/features/messages/domain/models/message.model";
import { MessageBuilder } from "../../../../builders/";
import { ICacheRepository } from "../../../../../src/core/domain/contracts/cache_repository.contract";
import { DeleteMessageParams } from "../../../../../src/features/messages/domain/models/delete_message.params";
import { NotFoundFailure } from "../../../../../src/core/domain/errors/errors";

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

const makeParams = (): DeleteMessageParams => {
  return {
    uid: "any_uid",
    userUid: "any_userUid",
  };
};

const makeSut = () => {
  const repository = mockMessageRepository();
  const cache = mockCacheRepository();
  const sut = new DeleteMessageUseCase(repository, cache);
  return { sut, repository, cache };
};

describe("DeleteMessageUseCase", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Deve chamar o MessageRepository e CacheRepository com os parametros corretos", async () => {
    const { sut, repository, cache } = makeSut();
    const repositorySpyFind = jest.spyOn(repository, "find");
    const repositorySpyDelete = jest.spyOn(repository, "delete");
    const cacheSpy = jest.spyOn(cache, "delete");
    const params = makeParams();
    await sut.execute(params);
    expect(repositorySpyFind).toHaveBeenCalledWith(params.uid);
    expect(repositorySpyDelete).toHaveBeenCalledWith(params.uid);
    expect(cacheSpy).toHaveBeenCalledWith(`message-${params.userUid}:all`);
  });

  test("Deve retornar um NotFoundError se não encontrar a mensagem", async () => {
    const { sut, repository } = makeSut();
    const params = makeParams();
    jest.spyOn(repository, "find").mockResolvedValue(undefined);
    await expect(sut.execute(params)).rejects.toThrow(
      new NotFoundFailure("Mensagem")
    );
    const repositorySpy = jest.spyOn(repository, "delete");
    expect(repositorySpy).not.toBeCalled();
  });

  test("Deve retornar um NotFoundError se não encontrar a mensagem com o mesmo userUid informado", async () => {
    const { sut, repository } = makeSut();
    const params = makeParams();
    params.userUid = "other_userUid";
    jest.spyOn(repository, "find");
    await expect(sut.execute(params)).rejects.toThrow(
      new NotFoundFailure("Mensagem")
    );
    const repositorySpy = jest.spyOn(repository, "delete");
    expect(repositorySpy).not.toBeCalled();
  });

  test("Deve verificar se é chamado o repository.delete", async () => {
    const { sut, repository } = makeSut();
    const repositorySpy = jest.spyOn(repository, "delete");
    const params = makeParams();
    await sut.execute(params);
    expect(repositorySpy).toBeCalled();
  });
});
