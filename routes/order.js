import express from "express";

const routes = express.Router();

import {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder
} from "../controller/order.js";

routes.post("/order", createOrder);
routes.get("/getOrder", getOrders);
routes.post("/updateOrder", updateOrder);
routes.delete("/deleteOrder", deleteOrder);


export default routes;
