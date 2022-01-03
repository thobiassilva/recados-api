import express, { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { MessageController } from "../controllers/message.controllers";
import { messagesList } from "../database";
import Message from "../entities/message.entity";

export const messageRoutes = express.Router();

messageRoutes.get("/", MessageController.getMessages);

messageRoutes.post("/", MessageController.createMessage);

messageRoutes.put("/:uid", MessageController.editMessage);

messageRoutes.delete("/:uid", MessageController.deleteMessage);
