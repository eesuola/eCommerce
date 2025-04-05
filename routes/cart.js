import express from "express";
const routes = express.Router();
// import { verifyToken } from '../middleware/auth.js';
import {
  addItemToCart,
  updateCart,
  removeCart,
  clearAllCarts,
} from "../controller/cart.js";

routes.post("/cart", addItemToCart);
routes.post("/updateCart", updateCart);
routes.delete("/deleteCart", removeCart);
routes.delete("/deleteAllCarts", clearAllCarts);

export default routes;
