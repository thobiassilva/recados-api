import { DatabaseConnection } from "../../../../../src/core/infra/database/connections/connection";
import { Message } from "../../../../../src/core/infra/database/entities/message.entity";
import { IMessage } from "../../../../../src/features/messages/domain/models/message.model";

export class MessageEntityBuilder {
  #uid = "any_uid";
  #title = "any_title";
  #detail = "any_detail";
  #userUid = "any_uid";

  static init(): MessageEntityBuilder {
    return new MessageEntityBuilder();
  }

  async builder(): Promise<IMessage> {
    await DatabaseConnection.initConnection();
    const repository =
      DatabaseConnection.getConnection().getRepository(Message);

    const entity = repository.create({
      uid: this.#uid,
      title: this.#title,
      detail: this.#detail,
      userUid: this.#userUid,
    });
    await repository.save(entity);
    return entity;
  }
}
