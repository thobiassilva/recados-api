import { Request, Response, Router } from "express";
import { CreateMessageUseCase } from "../../domain/usecases/create_message.usecase";
import { DeleteMessageUseCase } from "../../domain/usecases/delete_message.usecase";
import { GetMessagesUseCase } from "../../domain/usecases/get_messages.usecase";
import { UpdateMessageUseCase } from "../../domain/usecases/update_message.usecase";
import { MessageRepository } from "../../infra/repositories/message.repository";
import { CreateMessageController } from "../controllers/create_messsage.controller";
import { DeleteMessageController } from "../controllers/delete_message.controller";
import { GetMessagesController } from "../controllers/get_messages.controllers";
import { UpdateMessageController } from "../controllers/update_message.controller";

export class MessageRouter {
  static getRoutes() {
    const routes = Router();

    const messageRepository = new MessageRepository();

    const getMessagesUseCase = new GetMessagesUseCase(messageRepository);
    const createMessageUseCase = new CreateMessageUseCase(messageRepository);
    const updateMessageUseCase = new UpdateMessageUseCase(messageRepository);
    const deleteMessageUseCase = new DeleteMessageUseCase(messageRepository);

    const getMessagesController = new GetMessagesController(getMessagesUseCase);
    const createMessageController = new CreateMessageController(
      createMessageUseCase
    );
    const updateMessageController = new UpdateMessageController(
      updateMessageUseCase
    );
    const deleteMessageController = new DeleteMessageController(
      deleteMessageUseCase
    );

    routes.get("/", (req: Request, res: Response) =>
      getMessagesController.handle(req, res)
    );
    routes.post("/", (req: Request, res: Response) =>
      createMessageController.handle(req, res)
    );
    routes.put("/:uid", (req: Request, res: Response) =>
      updateMessageController.handle(req, res)
    );
    routes.delete("/:uid", (req: Request, res: Response) =>
      deleteMessageController.handle(req, res)
    );

    return routes;
  }
}
