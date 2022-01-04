import express, { Request, Response } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthParams } from "../utils/interfaces";

export const routes = express.Router();

routes.post("/login", async (req: Request, res: Response) => {
  try {
    const authParams: AuthParams = req.body;

    const result = await new AuthController().login(authParams);

    return res.status(result.statusCode).send(result.body);
  } catch (error) {
    return res.status(500).send({ success: false, message: "Erro interno" });
  }
});

routes.post("/register", async (req: Request, res: Response) => {
  try {
    const authParams: AuthParams = req.body;

    const result = await new AuthController().register(authParams);

    return res.status(result.statusCode).send(result.body);
  } catch (error) {
    return res.status(500).send({ success: false, message: "Erro interno" });
  }
});
