import Joi from "joi";
import { Sale, SaleInput } from "../models/Sale";
import { Gender, GenderInput } from "../models/Gender";
import genericValidator from "./generic.validator";

const saleInputsSchema = Joi.array()
  .items(
    Joi.object<SaleInput>({
      USER_NAME: Joi.string().required(),
      AGE: Joi.string().required(),
      HEIGHT: Joi.string().required(),
      GENDER: Joi.string()
        .valid(...Object.keys(GenderInput))
        .required(),
      SALE_AMOUNT: Joi.string().required(),
      LAST_PURCHASE_DATE: Joi.string().required(),
    }),
  )
  .min(1);

const salesSchema = Joi.array()
  .items(
    Joi.object<Sale>({
      userName: Joi.string().required(),
      age: Joi.number().required(),
      height: Joi.number().required(),
      gender: Joi.string()
        .valid(...Object.values(Gender))
        .required(),
      saleAmount: Joi.number().required(),
      lastPurchaseDate: Joi.date().required(),
    }),
  )
  .min(1);

const saleValidator = {
  validateSaleInputs(saleInputs: SaleInput[]) {
    return genericValidator.validate(saleInputsSchema, saleInputs);
  },

  validateSales(sales: Sale[]) {
    return genericValidator.validate(salesSchema, sales);
  },
};

export default saleValidator;
