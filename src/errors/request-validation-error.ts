import { ValidationError } from "express-validator";
import { CustomError } from "./customer-error";

export class RequestValidationError extends CustomError {
  statusCode = 422;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    // Extend build in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError() {
    return this.errors.map((error) => {
      if (error.type == "field") {
        return { message: error.msg, field: error.path };
      } else {
        return { message: error.msg };
      }
    });
  }
}
