import express from "express";
import fileUpload from "express-fileupload";
import addRecordsController from "../controllers/sales/addRecords.controller";
import getReportController from "../controllers/sales/getReport.controller";
import withErrorsHandler from "../middlewares/withErrorsHandler";

const routes = express();

routes.post(
  "/record",
  fileUpload({
    createParentPath: true,
  }),
  withErrorsHandler(addRecordsController),
);
routes.get("/report", withErrorsHandler(getReportController));

export default routes;
