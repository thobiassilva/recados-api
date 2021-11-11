import express, { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { usersList } from "./database";
import User from "./entities/user.entity";

export const routes = express.Router();

interface AuthParams {
  login: string;
  password: string;
}

routes.get("/", (req: Request, res: Response) => {
  try {
    return res
      .status(200)
      .send({ success: true, data: usersList, message: "Sucesso" });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Erro interno" });
  }
});

routes.post("/login", (req: Request, res: Response) => {
  try {
    const authParams: AuthParams = req.body;

    if (!authParams.login || !authParams.password) {
      return res
        .status(400)
        .send({ success: false, message: "Dados não informados." });
    }

    let user = usersList.find((u) => u.login === authParams.login);

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Usuário não encontrado" });
    }

    if (user!.password !== authParams.password) {
      return res
        .status(400)
        .send({ success: false, message: "Senha inválida" });
    }

    return res
      .status(200)
      .send({ success: true, data: user!.uid, message: "Sucesso" });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Erro interno" });
  }
});

routes.post("/register", (req: Request, res: Response) => {
  try {
    const authParams: AuthParams = req.body;

    if (!authParams.login || !authParams.password) {
      return res
        .status(400)
        .send({ success: false, message: "Dados não informados." });
    }

    const user = new User(uuid(), authParams.login, authParams.password);

    usersList.push(user);

    return res
      .status(200)
      .send({ success: true, data: user!.uid, message: "Sucesso" });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Erro interno" });
  }
});
