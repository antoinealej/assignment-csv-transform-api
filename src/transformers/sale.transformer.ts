import { Sale, SaleInput } from "../models/Sale";
import genderTransformer from "./gender.transformer";

const saleTransformer = {
  saleInputToSale(saleInput: SaleInput): Sale {
    return {
      userName: saleInput.USER_NAME,
      age: parseInt(saleInput.AGE),
      height: parseInt(saleInput.HEIGHT),
      gender: genderTransformer.genderInputToGender(saleInput.GENDER),
      saleAmount: parseInt(saleInput.SALE_AMOUNT),
      lastPurchaseDate: new Date(saleInput.LAST_PURCHASE_DATE),
    };
  },
};

export default saleTransformer;
