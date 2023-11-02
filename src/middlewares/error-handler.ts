import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/customer-error";
// import { RequestValidationError } from "../errors/request-validation-error";
// import { DatabaseConnectionError } from "../errors/database-connection-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if (err instanceof RequestValidationError) {
  //   console.log("Request Validation error");

  //   return res.status(err.statusCode).send({ errors: err.serializeError() });
  // }

  // if (err instanceof DatabaseConnectionError) {
  //   console.log("DB connection error");

  //   return res.status(err.statusCode).send({ errors: err.serializeError() });
  // }

  if (err instanceof CustomError) {
    console.log("Request Validation error");

    return res.status(err.statusCode).send({ errors: err.serializeError() });
  }

  console.log(err)

  res.status(400).send({
    errors: [
      {
        message: err.message,
      },
    ],
  });
};
