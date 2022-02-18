import { IUserRepository } from "../../../../../src/core/domain/contracts/user_repository.contract";
import { IUser } from "../../../../../src/core/domain/models/user.model";
import { UserAlreadyExistsFailure } from "../../../../../src/features/authentication/domain/errors/errors";
import { RegisterParams } from "../../../../../src/features/authentication/domain/models/";
import { RegisterUseCase } from "../../../../../src/features/authentication/domain/usecases";
import { UserBuilder } from "../../../../builders/user.builder";

const mockUserRepository = (): IUserRepository => {
  class MockUserRepository implements IUserRepository {
    async create(user: IUser): Promise<IUser> {
      return UserBuilder.init().builder();
    }
    async find(login: string): Promise<IUser | undefined> {
      return undefined;
    }
  }
  return new MockUserRepository();
};

const makeParams = (): RegisterParams => {
  return {
    login: "any_login",
    password: "any_password",
  };
};

const makeSut = () => {
  const userRepository = mockUserRepository();
  const sut = new RegisterUseCase(userRepository);
  return { sut, userRepository };
};

describe("RegisterUseCase", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Deve chamar o repositorio com os parametros corretos", async () => {
    const { sut, userRepository } = makeSut();
    const verifySpy = jest.spyOn(userRepository, "find");
    const params = makeParams();
    await sut.execute(params);
    expect(verifySpy).toHaveBeenCalledWith(params.login);
  });

  test("Deve retornar um UserAlreadyExistsFailure se ja encontrar um usuario como mesmo login", async () => {
    const { sut, userRepository } = makeSut();
    const params = makeParams();
    jest
      .spyOn(userRepository, "find")
      .mockResolvedValue(UserBuilder.init().builder());
    await expect(sut.execute(params)).rejects.toThrow(
      new UserAlreadyExistsFailure()
    );
  });

  test("Deve retornar um User", async () => {
    const { sut } = makeSut();
    const params = makeParams();
    const result = await sut.execute(params);
    expect(result).toBeTruthy();
    expect(result).toMatchObject(UserBuilder.init().builder());
  });
});
