import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { IMessage } from "../../../../features/messages/domain/models/message.model";

@Entity()
export class Message implements IMessage {
  @PrimaryColumn({
    type: "uuid",
  })
  uid!: string;

  @Column()
  title!: string;

  @Column()
  detail!: string;

  @Column({
    type: "uuid",
    name: "user_uid",
  })
  userUid!: string;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt!: Date;
}
