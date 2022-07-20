import { Gender, GenderInput } from "./Gender";

export type SaleInput = {
  USER_NAME: string;
  AGE: string;
  HEIGHT: string;
  GENDER: GenderInput;
  SALE_AMOUNT: string;
  LAST_PURCHASE_DATE: string;
};

export type Sale = {
  userName: string;
  age: number;
  height: number;
  gender: Gender;
  saleAmount: number;
  lastPurchaseDate: Date;
};
