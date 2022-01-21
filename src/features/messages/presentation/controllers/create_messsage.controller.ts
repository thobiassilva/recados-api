import { Request, Response } from "express";
import { IController } from "../../../../core/presentation/contracts/controller.contract";
import {
  badRequest,
  ok,
  serverError,
} from "../../../../core/presentation/helpers/http_handler";
import { CreateMessageUseCase } from "../../domain/usecases/create_message.usecase";

export class CreateMessageController implements IController {
  constructor(private usecase: CreateMessageUseCase) {}

  async handle(req: Request, res: Response): Promise<any> {
    try {
      const userUid = req.headers.authorization!;
      const { title, detail } = req.body;

      if (!title || !detail) {
        return badRequest(res, "Dados não informados.");
      }

      const result = await this.usecase.execute({ title, detail, userUid });

      return ok(res, result);
    } catch (error) {
      return serverError(res, error);
    }
  }
}
