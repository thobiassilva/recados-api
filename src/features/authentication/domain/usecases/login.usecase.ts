import { IUseCase } from "../../../../core/domain/contracts/usecase.contract";
import { IUserRepository } from "../../../../core/domain/contracts/user_repository.contract";
import { IUser } from "../../../../core/domain/models/user.model";
import { LoginParams } from "../models/login.params";

export class LoginUseCase implements IUseCase {
  constructor(private repository: IUserRepository) {}

  async execute(params: LoginParams): Promise<IUser> {
    const user: IUser | undefined = await this.repository.find(params.login);

    if (!user) {
      //  throw new NotFoundError("User");
      throw new Error();
    }

    //   const passwordMatches = Cryptography.compare(
    //     params.password,
    //     profile.password
    // );

    const passwordMatches = params.password === user.password;

    if (!passwordMatches) {
      // throw new InvalidCredentialsError();
      throw new Error();
    }

    return user;
  }
}
