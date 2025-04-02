import { get } from "mongoose";
import { products } from "../models/products.js";

export const createProduct = async (req, res) => {
  try {
    const product = new products(req.body);
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
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await products.find();
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await products.findById();
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProducts = async (req, res) => {
  try {
  } catch (error) {}
};
export const deleteProduct = async (req, res) => {
  try {
    const product = await products.findByIdAndDelete();
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
