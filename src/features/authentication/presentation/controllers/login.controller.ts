import { Request, Response } from "express";
import { IController } from "../../../../core/presentation/contracts/controller.contract";
import {
  badRequest,
  ok,
  serverError,
} from "../../../../core/presentation/helpers/http_handler";
import { LoginParams } from "../../domain/models/login.params";
import { LoginUseCase } from "../../domain/usecases/login.usecase";

export class LoginController implements IController {
  constructor(private usecase: LoginUseCase) {}

  async handle(req: Request, res: Response): Promise<any> {
    try {
      const { login, password }: LoginParams = req.body;

      if (!login || !password) {
        return badRequest(res, "Dados não informados.");
      }

      const result = await this.usecase.execute({
        login,
        password,
      });

      return ok(res, result.uid);
    } catch (err) {
      return serverError(res, err);
    }
  }
}
