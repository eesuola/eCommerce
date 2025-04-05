import express from "express"; //Anytime you want to use a router , you have to import these two items
const routes = express.Router();

import { getUsers } from "../controller/admin.js";
import { getOrders } from "../controller/admin.js";
import { getProducts } from "../controller/admin.js";
import { getCategories } from "../controller/admin.js";

routes.get("/users", getUsers);
routes.get("/getOrder", getOrders);
routes.get("/retrieveProduct", getProducts);
routes.get("/retrieveCategory", getCategories);

export default routes;
