import { v4 as uuid } from "uuid";
import { IUseCase } from "../../../../core/domain/contracts/usecase.contract";
import { IUserRepository } from "../../../../core/domain/contracts/user_repository.contract";
import { IUser } from "../../../../core/domain/models/user.model";
import { UserAlreadyExistsFailure } from "../errors/errors";
import { RegisterParams } from "../models/register.params";

export class RegisterUseCase implements IUseCase {
  constructor(private repository: IUserRepository) {}
  async execute(params: RegisterParams): Promise<IUser> {
    const user: IUser | undefined = await this.repository.find(params.login);

    if (!!user) {
      throw new UserAlreadyExistsFailure();
    }

    return await this.repository.create({
      uid: uuid(),
      login: params.login,
      password: params.password,
    });
  }
}
