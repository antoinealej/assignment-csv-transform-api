import { Collection, MongoClient } from "mongodb";
import config from "../config";
import { Sale } from "../models/Sale";

const url = config.mongo.url;
const client = new MongoClient(url);

const dbName = config.mongo.dbName;

const db = async () => {
  await client.connect();
  return client.db(dbName);
};

export const getRecordsCollection = async (): Promise<Collection<Sale>> => {
  return (await db()).collection("records");
};
