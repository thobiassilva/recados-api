import { NextFunction, Request, Response } from "express";

export const authorizationValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res.status(400).send({ message: "Não foi informado o token" });
  }
  next();
};
