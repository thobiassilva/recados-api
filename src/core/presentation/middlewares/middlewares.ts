import { NextFunction, Request, Response } from "express";
import { InvalidTokenFailure } from "../../domain/errors/errors";
import { serverError } from "../helpers/http_handler";

export const authorizationValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return serverError(res, new InvalidTokenFailure());
  }
  next();
};
