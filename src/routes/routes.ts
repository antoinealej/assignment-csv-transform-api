import express from "express";
import salesRoutes from "./sales.routes";

const routes = express();

routes.use("/sales", salesRoutes);

export default routes;
