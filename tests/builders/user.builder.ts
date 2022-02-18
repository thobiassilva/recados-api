import { IUser } from "../../src/core/domain/models/user.model";

export class UserBuilder {
  #uid = "any_uid";
  #login = "any_login";
  #password = "any_password";

  static init(): UserBuilder {
    return new UserBuilder();
  }

  builder(): IUser {
    return {
      uid: this.#uid,
      login: this.#login,
      password: this.#password,
    };
  }
}
