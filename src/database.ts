import { v4 as uuid } from "uuid";
import Message from "./entities/message.entity";
import User from "./entities/user.entity";

export let messagesList: Message[] = [];
export let usersList: User[] = [new User(uuid(), "thobiassilva", "123456")];
