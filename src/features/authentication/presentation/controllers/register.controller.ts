import { Request, Response } from "express";
import { IController } from "../../../../core/presentation/contracts/controller.contract";
import {
  badRequest,
  ok,
  serverError,
} from "../../../../core/presentation/helpers/http_handler";
import { RegisterParams } from "../../domain/models/register.params";
import { RegisterUseCase } from "../../domain/usecases/register.usecase";

export class RegisterController implements IController {
  constructor(private usecase: RegisterUseCase) {}

  async handle(req: Request, res: Response): Promise<any> {
    try {
      const { login, password }: RegisterParams = req.body;

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
