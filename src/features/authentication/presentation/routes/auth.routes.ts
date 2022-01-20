import { Request, Response, Router } from "express";
import { UserRepository } from "../../../../core/infra/repositories/user.repository";
import { LoginUseCase } from "../../domain/usecases/login.usecase";
import { RegisterUseCase } from "../../domain/usecases/register.usecase";
import { LoginController } from "../controllers/login.controller";
import { RegisterController } from "../controllers/register.controller";

export class AuthRouter {
  static getRoutes() {
    const routes = Router();

    const userRepository = new UserRepository();

    const loginUseCase = new LoginUseCase(userRepository);
    const registerUseCase = new RegisterUseCase(userRepository);

    const loginController = new LoginController(loginUseCase);
    const registerController = new RegisterController(registerUseCase);

    routes.post("/login", (req: Request, res: Response) =>
      loginController.handle(req, res)
    );
    routes.post("/register", (req: Request, res: Response) =>
      registerController.handle(req, res)
    );

    return routes;
  }
}
