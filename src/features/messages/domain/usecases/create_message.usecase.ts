import { v4 as uuid } from "uuid";
import { ICacheRepository } from "../../../../core/domain/contracts/cache_repository.contract";
import { IUseCase } from "../../../../core/domain/contracts/usecase.contract";
import { IMessageRepository } from "../contracts/message_repository.contract";
import { CreateMessageParams } from "../models/create_message.params";
import { IMessage } from "../models/mesage.model";

export class CreateMessageUseCase implements IUseCase {
  constructor(
    private repository: IMessageRepository,
    private cacheRepository: ICacheRepository
  ) {}

  async execute(params: CreateMessageParams): Promise<IMessage> {
    await this.cacheRepository.delete(`message-${params.userUid}:all`);
    return await this.repository.create({
      uid: uuid(),
      title: params.title,
      detail: params.detail,
      userUid: params.userUid,
    });
  }
}
