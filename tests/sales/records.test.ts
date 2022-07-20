import request from "supertest";
import salesRoutes from "../../src/routes/sales.routes";
import { errorsBuilders } from "../../src/helpers/errors/errors.helper";

const results = [
  {
    _id: "62d74826a84881eaa457b708",
    userName: "John Doe",
    age: 29,
    height: 177,
    gender: "M",
    saleAmount: 21312,
    lastPurchaseDate: "2020-11-05T12:15:30.000Z",
  },
  {
    _id: "62d74ca0b7b6f1c493074f3c",
    userName: "John Doe",
    age: 29,
    height: 177,
    gender: "M",
    saleAmount: 21312,
    lastPurchaseDate: "2020-11-05T13:15:30.000Z",
  },
];

const collectionMock = {
  insertMany: () => ({
    result: "insert many results",
  }),
  find: () => ({
    toArray: () => results,
  }),
};

const mockMongo = {
  getRecordsCollection: () => collectionMock,
};

jest.mock("../../src/services/mongo.service", () => ({ getRecordsCollection: () => mockMongo.getRecordsCollection() }));

describe("salesRoutes", () => {
  describe("GET /report", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should get the different sale records when no date are provided", async () => {
      const findSpy = jest.spyOn(collectionMock, "find");
      const res = await request(salesRoutes).get("/report").send();

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(results);
      expect(findSpy).toBeCalledWith({});
    });

    it("should get the different sale records when a date is provided", async () => {
      const findSpy = jest.spyOn(collectionMock, "find");
      const res = await request(salesRoutes).get("/report").query({
        to: "2020-11-05T12:35:30.000Z",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(results);
      expect(findSpy).toBeCalledWith({
        lastPurchaseDate: {
          $lte: new Date("2020-11-05T12:35:30.000Z"),
        },
      });
    });

    it("should get the different sale records when both dates are provided", async () => {
      const findSpy = jest.spyOn(collectionMock, "find");
      const res = await request(salesRoutes).get("/report").query({
        from: "2020-11-05T11:15:30.000Z",
        to: "2020-11-05T12:35:30.000Z",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(results);
      expect(findSpy).toBeCalledWith({
        lastPurchaseDate: {
          $gte: new Date("2020-11-05T11:15:30.000Z"),
          $lte: new Date("2020-11-05T12:35:30.000Z"),
        },
      });
    });
  });
  describe("POST /record", () => {
    const buffer = Buffer.from(`USER_NAME,AGE,HEIGHT,GENDER,SALE_AMOUNT,LAST_PURCHASE_DATE
John Doe,29,177,M,21312,2020-11-05T13:15:30Z
Jane Doe,32,187,f,5342,2019-12-05T13:15:30+08:00
`);

    it("should return the result of the insertMany when the data are right", async () => {
      const insertManySpy = jest.spyOn(collectionMock, "insertMany");
      const res = await request(salesRoutes).post("/record").attach("records", buffer, "records.csv");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual({
        result: "insert many results",
      });
      expect(insertManySpy).toHaveBeenCalledWith([
        {
          age: 29,
          gender: "M",
          height: 177,
          lastPurchaseDate: new Date("2020-11-05T13:15:30.000Z"),
          saleAmount: 21312,
          userName: "John Doe",
        },
        {
          age: 32,
          gender: "F",
          height: 187,
          lastPurchaseDate: new Date("2019-12-05T05:15:30.000Z"),
          saleAmount: 5342,
          userName: "Jane Doe",
        },
      ]);
    });

    it("should return an error when there is no file provided", async () => {
      const res = await request(salesRoutes).post("/record").send();

      const expectedError = errorsBuilders.globals.badRequest();
      await expect(res.statusCode).toEqual(expectedError.statusCode);
      await expect(res.body).toEqual({ key: expectedError.key, message: "You must provide a file" });
    });

    it("should return an error when the file is not names 'records'", async () => {
      const res = await request(salesRoutes).post("/record").attach("name", buffer, "records.txt");

      const expectedError = errorsBuilders.globals.badRequest();
      await expect(res.statusCode).toEqual(expectedError.statusCode);
      await expect(res.body).toEqual({ key: expectedError.key, message: "File must be named 'records'" });
    });

    it("should return an error when multiple files are uploaded", async () => {
      const res = await request(salesRoutes)
        .post("/record")
        .attach("records", buffer, "records.txt")
        .attach("records", buffer, "records.txt");

      const expectedError = errorsBuilders.globals.badRequest();
      await expect(res.statusCode).toEqual(expectedError.statusCode);
      await expect(res.body).toEqual({ key: expectedError.key, message: "You can only upload one file" });
    });

    it("should return an error when the file is not a csv", async () => {
      const res = await request(salesRoutes).post("/record").attach("records", buffer, "records.txt");

      const expectedError = errorsBuilders.globals.badRequest();
      await expect(res.statusCode).toEqual(expectedError.statusCode);
      await expect(res.body).toEqual({ key: expectedError.key, message: "You can only upload csv files" });
    });

    it("should return an error when the file format is wrong", async () => {
      const buffer = Buffer.from(`USER_NAME,HEIGHT,GENDER,SALE_AMOUNT,LAST_PURCHASE_DATE
John Doe,177,M,21312,2020-11-05T13:15:30Z
Jane Doe,187,f,5342,2019-12-05T13:15:30+08:00
`);
      const res = await request(salesRoutes).post("/record").attach("records", buffer, "records.csv");

      const expectedError = errorsBuilders.globals.badRequest();
      await expect(res.statusCode).toEqual(expectedError.statusCode);
      await expect(res.body).toEqual({ key: expectedError.key, message: '"[0].AGE" is required' });
    });
  });
});
