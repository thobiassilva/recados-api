import { IUseCase } from "../../../../core/domain/contracts/usecase.contract";
import { IMessageRepository } from "../contracts/message_repository.contract";
import { IMessage } from "../models/mesage.model";
import { UpdateMessageParams } from "../models/update_message.params";

export class UpdateMessageUseCase implements IUseCase {
  constructor(private repository: IMessageRepository) {}

  async execute(params: UpdateMessageParams): Promise<IMessage> {
    const message = await this.repository.find(params.uid);

    if (!message) {
      //  notFound
      throw new Error();
    }

    const data = {
      uid: params.uid,
      title: params.title,
      detail: params.detail,
      userUid: params.userUid,
    };

    const result = await this.repository.update(data);

    if (!result) {
      throw new Error("");
    }

    return data;
  }
}
