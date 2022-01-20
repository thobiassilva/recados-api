import { IMessage } from "../models/mesage.model";

export interface IMessageRepository {
  list(userUid: string): Promise<IMessage[]>;
  create(message: IMessage): Promise<IMessage>;
  find(uid: string): Promise<IMessage | undefined>;
  update(message: IMessage): Promise<boolean>;
  delete(uid: string): Promise<void>;
}
