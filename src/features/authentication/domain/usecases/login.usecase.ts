import { IUseCase } from "../../../../core/domain/contracts/usecase.contract";
import { IUserRepository } from "../../../../core/domain/contracts/user_repository.contract";
import { NotFoundFailure } from "../../../../core/domain/errors/errors";
import { IUser } from "../../../../core/domain/models/user.model";
import { InvalidCredentialsFailure } from "../errors/errors";
import { LoginParams } from "../models/login.params";

export class LoginUseCase implements IUseCase {
  constructor(private repository: IUserRepository) {}

  async execute(params: LoginParams): Promise<IUser> {
    const user: IUser | undefined = await this.repository.find(params.login);

    if (!user) {
      throw new NotFoundFailure("User");
    }

    //   const passwordMatches = Cryptography.compare(
    //     params.password,
    //     profile.password
    // );

    const passwordMatches = params.password === user.password;

    if (!passwordMatches) {
      throw new InvalidCredentialsFailure();
    }

    return user;
  }
}
