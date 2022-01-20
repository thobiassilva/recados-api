import express from "express";
import { AuthRouter } from "../../../features/authentication/presentation/routes/auth.routes";
import { MessageRouter } from "../../../features/messages/presentation/routes/messages.routes";
import { authorizationValid } from "../middlewares/middlewares";

export const makeRoutes = (app: express.Application) => {
  app.use("/auth", AuthRouter.getRoutes());
  app.use("/messages", authorizationValid, MessageRouter.getRoutes());
};
