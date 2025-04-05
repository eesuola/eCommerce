import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();
import Order from "../model/order.js";
import User from "../model/user.js";

export const createOrder = async (req, res) => {
  try {
    const { user, products, amount, status, shippingAddress, paymentMethod } =
      req.body;
    if (
      !user ||
      !products ||
      !amount ||
      !status ||
      !shippingAddress ||
      !paymentMethod
    ) {
      return res.status(400).json({
        success: false,
        message: "Kindly fill all the fields",
      });
    }

    const order = new Order({
      user,
      products,
      amount,
      status,
      shippingAddress,
      paymentMethod,
    });
    await order.save();
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
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

export const getOrders = async (req, res) => {
  try {
    const user = req.body.user;
    const products = req.body.products;
    const amount = req.body.amount;
    const status = req.body.status;
    const shippingAddress = req.body.shippingAddress;
    const paymentMethod = req.body.paymentMethod;

    const existingOrder = await Order.findOne({ user: user });
    if (!existingOrder) {
      throw new Error("You do not have any orders yet");
    }
    const isMatch = await (user, existingOrder.user);
    if (!isMatch) {
      throw new Error("Order not found");
    }
    const payload = {
      id: existingOrder._id,
      user: existingOrder.user,
      products: existingOrder.products,
      amount: existingOrder.amount,
      status: existingOrder.status,
      shippingAddress: existingOrder.shippingAddress,
      paymentMethod: existingOrder.paymentMethod,
    };
    const secret = process.env.JWT_SECRET;
    const jwtOptions = { expiresIn: "20d" };
    const token = jwt.sign(payload, secret, jwtOptions);
    res.status(200).json({
      success: true,
      message: `Order ${existingOrder.user} successfully fetched`,
      data: existingOrder,
      token: token,
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

export const updateOrder = async (req, res) => {
  try {
    const user = req.body.user;
    const updates = req.body;
    const existingOrder = await Order.findOneAndUpdate(
      { user: user },
      updates,
      { new: true },
    );

    if (!existingOrder) {
      throw new Error("No order found for this user");
    }
    res.status(200).json({
      success: true,
      message: `Order ${existingOrder.user} successfully updated`,
      data: existingOrder,
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

export const deleteOrder = async (req, res) => {
  try {
    const user = req.body.user;
    const remove = req.body;

    const existingOrder = await Order.findOneAndDelete({ user: user }, remove, {
      new: true,
    });
    if (!existingOrder) {
      throw new Error("No order found for this user");
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
