import { IUserRepository } from "../../../../../src/core/domain/contracts/user_repository.contract";
import { NotFoundFailure } from "../../../../../src/core/domain/errors/errors";
import { IUser } from "../../../../../src/core/domain/models/user.model";
import { InvalidCredentialsFailure } from "../../../../../src/features/authentication/domain/errors/errors";
import { LoginParams } from "../../../../../src/features/authentication/domain/models/login.params";
import { LoginUseCase } from "../../../../../src/features/authentication/domain/usecases/login.usecase";
import { UserBuilder } from "../../../../builders/user.builder";

const mockUserRepository = (): IUserRepository => {
  class MockUserRepository implements IUserRepository {
    async create(user: IUser): Promise<IUser> {
      return UserBuilder.init().builder();
    }
    async find(login: string): Promise<IUser | undefined> {
      return UserBuilder.init().builder();
    }
  }
  return new MockUserRepository();
};

const makeParams = (): LoginParams => {
  return {
    login: "any_login",
    password: "any_password",
  };
};

const makeSut = () => {
  const userRepository = mockUserRepository();
  const sut = new LoginUseCase(userRepository);
  return { sut, userRepository };
};

describe("LoginUseCase", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("Deve chamar o Repository com os parametros corretos", async () => {
    const { sut, userRepository } = makeSut();
    const verifySpy = jest.spyOn(userRepository, "find");
    const params = makeParams();
    await sut.execute(params);
    expect(verifySpy).toHaveBeenCalledWith(params.login);
  });

  test("Deve retornar um NotFoundError se não encontrar o usuario", async () => {
    const { sut, userRepository } = makeSut();
    const params = makeParams();
    jest.spyOn(userRepository, "find").mockResolvedValue(undefined);
    await expect(sut.execute(params)).rejects.toThrow(
      new NotFoundFailure("User")
    );
  });

  test("Deve retornar um InvalidCredentialsFailure caso a senha seja invalida", async () => {
    const { sut } = makeSut();
    const params = makeParams();
    params.password = "password_invalid";
    await expect(sut.execute(params)).rejects.toThrow(
      new InvalidCredentialsFailure()
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
