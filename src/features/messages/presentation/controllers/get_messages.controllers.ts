import { Request, Response } from "express";
import { IController } from "../../../../core/presentation/contracts/controller.contract";
import {
  ok,
  serverError,
} from "../../../../core/presentation/helpers/http_handler";
import { GetMessagesUseCase } from "../../domain/usecases/get_messages.usecase";

export class GetMessagesController implements IController {
  constructor(private usecase: GetMessagesUseCase) {}

  async handle(req: Request, res: Response): Promise<any> {
    try {
      const userUid = req.headers.authorization!;

      const result = await this.usecase.execute({ uid: userUid });

      return ok(res, result);
    } catch (error) {
      serverError(res, error);
    }
  }
}
