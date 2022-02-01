import { ICacheRepository } from "../../../../core/domain/contracts/cache_repository.contract";
import { IUseCase } from "../../../../core/domain/contracts/usecase.contract";
import { MessageRepository } from "../../infra/repositories/message.repository";
import { IMessage } from "../models/mesage.model";
import { UidParams } from "../models/uid.params";

export class GetMessagesUseCase implements IUseCase {
  constructor(
    private repository: MessageRepository,
    private cacheRepository: ICacheRepository
  ) {}

  async execute(params: UidParams): Promise<IMessage[]> {
    const key = `message-${params.uid}:all`;
    const cache = await this.cacheRepository.get<IMessage[] | undefined>(key);
    if (cache) return cache;
    const messages = await this.repository.list(params.uid);
    await this.cacheRepository.set(key, messages);
    return messages;
  }
}
