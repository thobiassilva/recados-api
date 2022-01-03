import express, { Request, Response } from "express";
import { usersList } from "../database";
import { v4 as uuid } from "uuid";
import User from "../entities/user.entity";

interface AuthParams {
  login: string;
  password: string;
}

export class AuthController {
  static async login(req: Request, res: Response) {
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
  }

  static async register(req: Request, res: Response) {
    try {
      const authParams: AuthParams = req.body;

      if (!authParams.login || !authParams.password) {
        return res
          .status(400)
          .send({ success: false, message: "Dados não informados." });
      }

      let userAlreadyRegistered = usersList.find(
        (u) => u.login === authParams.login
      );

      if (userAlreadyRegistered) {
        return res.status(400).send({
          success: false,
          message: "Usuário já registrado. Tente outro username ou faça login.",
        });
      }

      const user = new User(uuid(), authParams.login, authParams.password);

      usersList.push(user);

      return res
        .status(200)
        .send({ success: true, data: user!.uid, message: "Sucesso" });
    } catch (error) {
      return res.status(500).send({ success: false, message: "Erro interno" });
    }
  }
}
