import { IUseCase } from "../../../../core/domain/contracts/usecase.contract";
import { MessageRepository } from "../../infra/repositories/message.repository";
import { DeleteMessageParams } from "../models/delete_message.params";
import { UidParams } from "../models/uid.params";

export class DeleteMessageUseCase implements IUseCase {
  constructor(private repository: MessageRepository) {}

  async execute(params: DeleteMessageParams): Promise<void> {
    const message = await this.repository.find(params.uid);
    if (!message || message.userUid !== params.userUid) {
      // notFound
      throw new Error();
    }

    return await this.repository.delete(params.uid);
  }
}
