import express from "express";
import cors from "cors";
import { makeRoutes } from "../routes/routes";

export const app = express();

export const initServer = async () => {
  app.use(express.json());
  app.use(cors());

  makeRoutes(app);

  await app.listen(process.env.PORT || 8081, () => console.log("Server ON"));
};
