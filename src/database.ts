import { v4 as uuid } from "uuid";
import Message from "./entities/message.entity";
import User from "./entities/user.entity";

export let messagesList: Message[] = [
  new Message("a", "Titulo da Mensagem A", "Descricao da Mensagem A", "a"),
];
export let usersList: User[] = [new User("a", "thobiassilva", "123456")];
