import { Request, Response } from "express";
import { getRecordsCollection } from "../../services/mongo.service";
import Joi from "joi";
import genericValidator from "../../validators/generic.validator";
import { Sale } from "../../models/Sale";
import { Filter } from "mongodb";

type Query = {
  from?: string;
  to?: string;
};

const querySchema = Joi.object<Query>({
  from: Joi.string(),
  to: Joi.string(),
});

const addRecordsController = async (req: Request, res: Response) => {
  const query = genericValidator.validate<Query>(querySchema, req.query);

  const findQuery: Filter<Sale> = {};

  if (query.from || query.to) {
    findQuery.lastPurchaseDate = {};
    if (query.from) findQuery.lastPurchaseDate["$gte"] = new Date(query.from);
    if (query.to) findQuery.lastPurchaseDate["$lte"] = new Date(query.to);
  }

  const recordsCollection = await getRecordsCollection();

  const records = await recordsCollection.find<Sale>(findQuery).toArray();

  res.send(records);
};

export default addRecordsController;
