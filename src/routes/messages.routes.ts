import express, { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { messagesList } from "../database";
import Message from "../entities/message.entity";

export const messageRoutes = express.Router();

interface MessageParams {
  title: string;
  detail: string;
}

messageRoutes.get("/", (req: Request, res: Response) => {
  try {
    const userUid = req.headers.authorization;
    const userMessages = messagesList.filter(
      (message) => message.userUid == userUid
    );
    return res
      .status(200)
      .send({ success: true, data: userMessages, message: "Sucesso" });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Erro interno" });
  }
});

messageRoutes.post("/", (req: Request, res: Response) => {
  try {
    const userUid = req.headers.authorization!;
    const messageParams: MessageParams = req.body;

    if (!messageParams.title || !messageParams.detail) {
      return res
        .status(400)
        .send({ success: false, message: "Dados não informados." });
    }

    const message = new Message(
      uuid(),
      messageParams.title,
      messageParams.detail,
      userUid
    );

    messagesList.push(message);

    return res
      .status(200)
      .send({ success: true, data: message, message: "Sucesso" });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Erro interno" });
  }
});

messageRoutes.put("/:uid", (req: Request, res: Response) => {
  try {
    const userUid: string = req.headers.authorization!;
    const messageParams: MessageParams = req.body;
    const messageUid: string = req.params.uid;

    if (!messageUid) {
      return res
        .status(400)
        .send({ success: false, message: "Uid não informado." });
    }

    if (!messageParams.title || !messageParams.detail) {
      return res
        .status(400)
        .send({ success: false, message: "Dados não informados." });
    }

    const userMessages = messagesList.filter((m) => m.userUid === userUid);

    if (userMessages.length <= 0) {
      return res
        .status(404)
        .send({ success: false, message: "Mensagem nao encontrada" });
    }

    const index = userMessages.findIndex((m) => m.uid === messageUid);

    if (index < 0) {
      return res
        .status(404)
        .send({ success: false, message: "Mensagem nao encontrada" });
    }

    messagesList[index].title = messageParams.title;
    messagesList[index].detail = messageParams.detail;

    return res
      .status(200)
      .send({ success: true, data: messagesList[index], message: "Sucesso" });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Erro interno" });
  }
});

messageRoutes.delete("/:uid", (req: Request, res: Response) => {
  try {
    const userUid: string = req.headers.authorization!;
    const messageUid: string = req.params.uid;

    if (!messageUid) {
      return res
        .status(400)
        .send({ success: false, message: "Uid não informado." });
    }

    const userMessages = messagesList.filter((m) => m.userUid === userUid);

    if (userMessages.length <= 0) {
      return res
        .status(404)
        .send({ success: false, message: "Mensagem nao encontrada" });
    }

    const index = userMessages.findIndex((m) => m.uid === messageUid);

    if (index < 0) {
      return res
        .status(404)
        .send({ success: false, message: "Mensagem nao encontrada" });
    }

    messagesList.splice(index, 1);

    return res.status(200).send({
      success: true,
      message: "Sucesso",
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Erro interno" });
  }
});
