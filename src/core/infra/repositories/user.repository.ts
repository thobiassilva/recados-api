import { Repository } from "typeorm";
import { IUserRepository } from "../../domain/contracts/user_repository.contract";
import { IUser } from "../../domain/models/user.model";
import { DatabaseConnection } from "../database/connections/connection";
import { User } from "../database/entities/user.entity";

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = DatabaseConnection.getConnection().getRepository(User);
  }

  async create(user: IUser) {
    const userEntity = this.repository.create(user);
    return await this.repository.save(userEntity);
  }

  async find(login: string) {
    return await this.repository.findOne({ where: { login: login } });
  }
}
