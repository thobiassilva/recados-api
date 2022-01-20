import { Response } from "express";

export const ok = (res: Response, data?: any) => {
  return res.status(200).send({
    success: true,
    data,
  });
};

export const serverError = (res: Response, error?: any) => {
  // if (error instanceof DomainError || error instanceof ControllerError) {
  //     return res.status(error.code).send({
  //         success: false,
  //         error: error,
  //         message: error.message,
  //     });
  // }

  if (error instanceof Error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }

  return res.status(500).send({
    success: false,
    error,
    message: "unkwnown",
  });
};

export const badRequest = (res: Response, message?: string) => {
  return res.status(400).send({
    success: false,
    message,
  });
};
