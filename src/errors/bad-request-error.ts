import { CustomError } from "./customer-error";

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode || 400

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeError() {
    return [{ message: this.message }];
  }
}
