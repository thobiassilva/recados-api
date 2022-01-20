import { IUseCase } from "../../../../core/domain/contracts/usecase.contract";
import { MessageRepository } from "../../infra/repositories/message.repository";
import { IMessage } from "../models/mesage.model";
import { UidParams } from "../models/uid.params";

export class GetMessagesUseCase implements IUseCase {
  constructor(private repository: MessageRepository) {}

  async execute(params: UidParams): Promise<IMessage[]> {
    return await this.repository.list(params.uid);
  }
}
