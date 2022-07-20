import Joi from "joi";
import { errorsBuilders } from "../helpers/errors/errors.helper";

const genericValidator = {
  validate<TValue>(schema: Joi.Schema, value: TValue): TValue {
    const validationResult = schema.validate(value);
    if (validationResult.error) {
      throw errorsBuilders.globals.badRequest(validationResult.error.message);
    }
    return validationResult.value;
  },
};

export default genericValidator;
