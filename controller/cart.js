import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

import Cart from "../model/cart.js";
import User from "../model/user.js";
import { registration } from "./authentication.js";

export const addItemToCart = async (req, res) => {
  try {
    //console.log(req.body);
    const { product, user } = req.body;

    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }
    //console.log("Existing User:", existingUser);

    const existingCart = await Cart.findOne({ user });
    if (!existingCart) {
      const newCart = new Cart({
        user: user,
        product: [product],
      });
      await newCart.save();
      return res.status(201).json({
        success: true,
        message: "Cart created successfully",
        cart: newCart,
      });
    }

    const existingProduct = existingCart.product.find(
      (item) => item.product.toString() === product.product,
    );
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      existingCart.product.push(product);
    }
    await existingCart.save();
    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart: existingCart,
    });
  } catch (error) {
    console.error(error.message);
    if (!res.headersSent)
      res.status(400).json({
        success: false,
        message: error.message,
      });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { user, product } = req.body;

    const existingCart = await Cart.findOne({ user });

    if (!existingCart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    const existingProduct = existingCart.product.find(
      (item) => item.product.toString() === product.product,
    );

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }
    existingProduct.quantity = product.quantity;
    await existingCart.save();

    res.status(200).json({
      success: true,
      message: `Cart ${existingCart.product} successfully updated`,
      data: existingCart,
    });
  } catch (error) {
    console.error(error.message);
    if (!res.headersSent)
      res.status(400).json({
        success: false,
        message: error.message,
      });
  }
};

export const removeCart = async (req, res) => {
  try {
    console.log(req.body);

    const user = req.body.user;
    const remove = req.body;

    const existingCart = await Cart.findOneAndDelete({ user: user }, remove, {
      new: true,
    });

    if (!existingCart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
  } catch (error) {
    console.error(error.message);
    if (!res.headersSent)
      res.status(400).json({
        success: false,
        message: error.message,
      });
  }
};

export const clearAllCarts = async (req, res) => {
  try {
    await Cart.deleteMany({});
    res.status(200).json({
      success: true,
      message: "All carts cleared successfully",
    });
  } catch (error) {
    console.error(error.message);
    if (!res.headersSent)
      res.status(400).json({
        success: false,
        message: error.message,
      });
  }
};
