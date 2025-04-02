import express from 'express';
const routes = express.Router();
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controller/product.js';

import product from '../models/productModel.js';
import { verifyToken } from '../middleware/auth.js';


routes.get("/", getAllProducts);
routes.post("/", createProduct);
routes.get("/:id", getProductById);
routes.put("/:id", updateProduct);
routes.delete("/:id", deleteProduct);

export default routes;