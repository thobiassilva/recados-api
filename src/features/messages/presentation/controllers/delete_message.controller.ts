import { Request, Response } from "express";
import { IController } from "../../../../core/presentation/contracts/controller.contract";
import {
  ok,
  serverError,
} from "../../../../core/presentation/helpers/http_handler";
import { DeleteMessageUseCase } from "../../domain/usecases/delete_message.usecase";

export class DeleteMessageController implements IController {
  constructor(private usecase: DeleteMessageUseCase) {}

  async handle(req: Request, res: Response): Promise<any> {
    try {
      const userUid = req.headers.authorization!;
      const uid = req.params.uid;

      await this.usecase.execute({ uid, userUid });

      return ok(res, {});
    } catch (error) {
      return serverError(res, error);
    }
  }
}
