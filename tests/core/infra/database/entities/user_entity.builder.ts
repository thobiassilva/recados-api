import { IUser } from "../../../../../src/core/domain/models/user.model";
import { DatabaseConnection } from "../../../../../src/core/infra/database/connections/connection";
import { User } from "../../../../../src/core/infra/database/entities/user.entity";

export class UserEntityBuilder {
  #uid = "any_uid";
  #login = "any_login";
  #password = "any_password";

  static init(): UserEntityBuilder {
    return new UserEntityBuilder();
  }

  async builder(): Promise<IUser> {
    await DatabaseConnection.initConnection();
    const repository = DatabaseConnection.getConnection().getRepository(User);

    const entity = repository.create({
      uid: this.#uid,
      login: this.#login,
      password: this.#password,
    });
    await repository.save(entity);
    return entity;
  }
}
