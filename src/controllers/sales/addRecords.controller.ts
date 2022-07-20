import { Request, Response } from "express";
import _ from "lodash";
import { errorsBuilders } from "../../helpers/errors/errors.helper";
import csvHelper from "../../helpers/csv.helper";
import { getRecordsCollection } from "../../services/mongo.service";
import { Sale, SaleInput } from "../../models/Sale";
import saleTransformer from "../../transformers/sale.transformer";
import saleValidator from "../../validators/sale.validator";

const addRecordsController = async (req: Request, res: Response) => {
  if (!req.files) throw errorsBuilders.globals.badRequest("You must provide a file");

  const records = req.files.records;

  if (!records) throw errorsBuilders.globals.badRequest("File must be named 'records'");
  if (_.isArray(records)) throw errorsBuilders.globals.badRequest("You can only upload one file");
  if (records.mimetype !== "text/csv") throw errorsBuilders.globals.badRequest("You can only upload csv files");

  const saleInputs: SaleInput[] = await saleValidator.validateSaleInputs(
    await csvHelper.csvtojson(records.data.toString("utf8")),
  );

  const sales: Sale[] = saleValidator.validateSales(
    saleInputs.map((saleInput) => saleTransformer.saleInputToSale(saleInput)),
  );

  const recordsCollection = await getRecordsCollection();

  const response = await recordsCollection.insertMany(sales);

  res.send(response);
};

export default addRecordsController;
