import { Request, Response } from "express";
import { IController } from "../../../../core/presentation/contracts/controller.contract";
import {
  badRequest,
  ok,
  serverError,
} from "../../../../core/presentation/helpers/http_handler";
import { UpdateMessageUseCase } from "../../domain/usecases/update_message.usecase";

export class UpdateMessageController implements IController {
  constructor(private usecase: UpdateMessageUseCase) {}

  async handle(req: Request, res: Response): Promise<any> {
    try {
      const userUid = req.headers.authorization!;
      const { title, detail } = req.body;
      const uid = req.params.uid;

      if (!title || !detail) {
        return badRequest(res, "Dados não informados.");
      }

      const result = await this.usecase.execute({
        uid,
        title,
        detail,
        userUid,
      });

      return ok(res, result);
    } catch (error) {
      return serverError(res, error);
    }
  }
}
