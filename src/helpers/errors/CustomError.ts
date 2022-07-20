import { HTTP_STATUS } from "../HTTPStatus";

export enum ErrorKey {
  GLOBALS__VALIDATION_ERROR = "globals.validationError",
  GLOBALS__BAD_REQUEST = "globals.badRequest",
  GLOBALS__SERVER_ERROR = "globals.serverError",
  FILES__NOT_FOUND = "files.notFound",
}

export class CustomError extends Error {
  constructor(public key: ErrorKey, public statusCode = HTTP_STATUS.BAD_REQUEST, message?: string) {
    super(message);
  }
}
