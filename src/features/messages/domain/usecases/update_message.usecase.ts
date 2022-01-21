import { IUseCase } from "../../../../core/domain/contracts/usecase.contract";
import { NotFoundFailure } from "../../../../core/domain/errors/errors";
import { IMessageRepository } from "../contracts/message_repository.contract";
import { UpdateMessageFailure } from "../errors/errors";
import { IMessage } from "../models/mesage.model";
import { UpdateMessageParams } from "../models/update_message.params";

export class UpdateMessageUseCase implements IUseCase {
  constructor(private repository: IMessageRepository) {}

  async execute(params: UpdateMessageParams): Promise<IMessage> {
    const message = await this.repository.find(params.uid);

    if (!message) {
      throw new NotFoundFailure("Mensagem");
    }

    const data = {
      uid: params.uid,
      title: params.title,
      detail: params.detail,
      userUid: params.userUid,
    };

    const result = await this.repository.update(data);

    if (!result) {
      throw new UpdateMessageFailure();
    }

    return data;
  }
}
