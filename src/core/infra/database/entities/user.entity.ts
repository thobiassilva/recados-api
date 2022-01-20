import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { IUser } from "../../../domain/models/user.model";

@Entity()
export class User implements IUser {
  @PrimaryColumn({ type: "uuid" })
  uid!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt!: Date;
}
