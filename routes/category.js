import express from "express";

const routes = express.Router();

import {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../controller/category.js";

routes.post("/category", createCategory);
routes.get("/retrieveCategory", getCategory);
routes.post("/updateCategory", updateCategory);
routes.delete("/deleteCategory", deleteCategory);

export default routes;
