import { HTTP_STATUS } from "../HTTPStatus";
import { CustomError, ErrorKey } from "./CustomError";

function createErrorBuilder(key: ErrorKey, statusCode = HTTP_STATUS.BAD_REQUEST, message?: string) {
  return (customMessage?: string) => new CustomError(key, statusCode, customMessage ?? message);
}

export const errorsBuilders = {
  files: {
    notFound: createErrorBuilder(ErrorKey.FILES__NOT_FOUND, HTTP_STATUS.UNPROCESSABLE_ENTITY),
  },
  globals: {
    badRequest: createErrorBuilder(ErrorKey.GLOBALS__BAD_REQUEST, HTTP_STATUS.BAD_REQUEST),
    internal: createErrorBuilder(ErrorKey.GLOBALS__SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR),
    validationError: createErrorBuilder(ErrorKey.GLOBALS__VALIDATION_ERROR, HTTP_STATUS.BAD_REQUEST),
  },
};
