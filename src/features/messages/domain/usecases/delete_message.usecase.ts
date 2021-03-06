import { ICacheRepository } from "../../../../core/domain/contracts/cache_repository.contract";
import { IUseCase } from "../../../../core/domain/contracts/usecase.contract";
import { NotFoundFailure } from "../../../../core/domain/errors/errors";
import { IMessageRepository } from "../contracts/message_repository.contract";
import { DeleteMessageParams } from "../models/delete_message.params";

export class DeleteMessageUseCase implements IUseCase {
  constructor(
    private repository: IMessageRepository,
    private cacheRepository: ICacheRepository
  ) {}

  async execute(params: DeleteMessageParams): Promise<void> {
    const message = await this.repository.find(params.uid);
    if (!message || message.userUid !== params.userUid) {
      throw new NotFoundFailure("Mensagem");
    }

    await this.cacheRepository.delete(`message-${params.userUid}:all`);

    return await this.repository.delete(params.uid);
  }
}
