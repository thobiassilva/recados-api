import { Response } from "express";
import { Failure } from "../../domain/errors/errors";

export const ok = (res: Response, data?: any) => {
  return res.status(200).send({
    success: true,
    data,
  });
};

export const serverError = (res: Response, error?: any) => {
  if (error instanceof Failure) {
    return res.status(error.code).send({
      success: false,
      error: error.name,
      message: error.message,
    });
  }

  return res.status(500).send({
    success: false,
    error: { error },
    message: "Desconhecido",
  });
};

export const badRequest = (res: Response, message?: string) => {
  return res.status(400).send({
    success: false,
    error: "BadRequestFailure",
    message,
  });
};
