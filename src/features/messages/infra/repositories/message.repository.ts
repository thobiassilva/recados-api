import { Repository } from "typeorm";
import { DatabaseConnection } from "../../../../core/infra/database/connections/connection";
import { Message } from "../../../../core/infra/database/entities/message.entity";
import { IMessageRepository } from "../../domain/contracts/message_repository.contract";
import { IMessage } from "../../domain/models/mesage.model";

export class MessageRepository implements IMessageRepository {
  private repository: Repository<Message>;

  constructor() {
    this.repository = DatabaseConnection.getConnection().getRepository(Message);
  }

  async list(userUid: string) {
    return this.repository.find({ where: { userUid } });
  }

  async create(message: IMessage) {
    const messageEntity = this.repository.create(message);
    return await this.repository.save(messageEntity);
  }

  async find(uid: string) {
    return await this.repository.findOne(uid);
  }

  async update(message: IMessage) {
    const result = await this.repository.update(message.uid, message);
    return true;
  }

  async delete(uid: string) {
    await this.repository.delete(uid);
  }
}
