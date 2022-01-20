import { IUser } from "../models/user.model";

export interface IUserRepository {
  create(user: IUser): Promise<IUser>;
  find(login: string): Promise<IUser | undefined>;
}
