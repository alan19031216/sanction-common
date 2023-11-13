import { CustomError } from "./customer-error";

export class NotFoundError extends CustomError {
    statusCode = 404;

    constructor(message?: string) {
        super(message || "Not found");

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeError() {
        return [{ message: this.message }];
    }
}