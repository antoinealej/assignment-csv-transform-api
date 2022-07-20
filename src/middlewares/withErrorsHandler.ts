import { Request, Response } from "express";
import { CustomError, ErrorKey } from "../helpers/errors/CustomError";
import { HTTP_STATUS } from "../helpers/HTTPStatus";
import loggerHelper from "../helpers/logger.helper";

type ErrorResponse = { key: string; message?: string };

const withErrorsHandler =
  (controller: (req: Request, res: Response) => Promise<unknown>) => async (req: Request, res: Response) => {
    try {
      return await controller(req, res);
    } catch (error) {
      if (error instanceof CustomError) {
        res.statusCode = error.statusCode;
        const errorResponse: ErrorResponse = { key: error.key };
        if (error.message) errorResponse.message = error.message;
        res.send(errorResponse);
      } else {
        loggerHelper.error(error);
        res.statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
        const errorResponse: ErrorResponse = { key: ErrorKey.GLOBALS__SERVER_ERROR };
        res.send(errorResponse);
      }
    }
  };

export default withErrorsHandler;
