import { IMessage } from "../../src/features/messages/domain/models/message.model";

export class MessageBuilder {
  #uid = "any_uid";
  #title = "any_title";
  #detail = "any_detail";
  #userUid = "any_userUid";

  static init(): MessageBuilder {
    return new MessageBuilder();
  }

  builder(): IMessage {
    return {
      uid: this.#uid,
      title: this.#title,
      detail: this.#detail,
      userUid: this.#userUid,
    };
  }
}
