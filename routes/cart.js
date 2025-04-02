import express from 'express';
const routes = express.Router();
// import { verifyToken } from '../middleware/auth.js';
import { getCart, addToCart, removeFromCart } from '../controller/cart.js';


routes.post("/", addToCart);
routes.get("/", getCart);