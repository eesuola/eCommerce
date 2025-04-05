import express from "express";

const routes = express.Router();

import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controller/product.js";

routes.post("/product", createProduct);
routes.get("/retrieveProduct", getProducts);
routes.put("/updateProduct", updateProduct);
routes.delete("/deleteProduct", deleteProduct);

export default routes;
