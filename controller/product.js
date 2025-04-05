import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

import Product from "../model/product.js";
import { registration } from "./authentication.js";

export const createProduct = async (req, res) => {
  try {
    const existingProduct = await Product.findOne({ name: req.body.name });
    if (existingProduct) {
      throw new Error("Product already exists");
    }
    if (!req.body.name || !req.body.price || !req.body.description) {
      throw new Error("Product details not provided");
    }
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
    //console.log(error);
  }
};

export const getProducts = async (req, res) => {
  try {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;

    const existingProduct = await Product.findOne({ name: name });

    if (!existingProduct) {
      throw new Error("Product not found");
    }
    const isMatch = await (name, existingProduct.name);

    if (!isMatch) {
      throw new Error("Product Name not found");
    }

    const payload = {
      id: existingProduct._id,
      name: existingProduct.name,
      price: existingProduct.price,
    };
    const secret = process.env.JWT_SECRET;
    const jwtOptions = { expiresIn: "20d" };

    const token = jwt.sign(payload, secret, jwtOptions);

    res.status(200).json({
      success: true,
      message: `Product ${existingProduct.name} successfully fetched`,
      data: existingProduct,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const name = req.body.name;
    const updates = req.body;

    const existingProduct = await Product.findOneAndUpdate(
      { name: name },
      updates,
      { new: true },
    );

    if (!existingProduct) {
      throw new Error("Product not found");
    }
    res.status(200).json({
      success: true,
      message: `Product ${existingProduct.name} successfully updated`,
      data: existingProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const name = req.body.name;
    const remove = req.body;

    const existingProduct = await Product.findOneAndDelete(
      { name: name },
      remove,
      { new: true },
    );

    if (!existingProduct) {
      throw new Error("Product not found");
    }
    res.status(200).json({
      success: true,
      message: `Product ${existingProduct.name} successfully deleted`,
      data: existingProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
