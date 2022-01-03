import express, { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { AuthController } from "../controllers/auth.controller";
import { usersList } from "../database";
import User from "../entities/user.entity";

export const routes = express.Router();

routes.post("/login", AuthController.login);

routes.post("/register", AuthController.register);
