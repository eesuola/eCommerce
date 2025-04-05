import User from "../model/user.js";
import Order from "../model/order.js";
import Cart from "../model/cart.js";
import Product from "../model/product.js";
import Category from "../model/category.js";

export const getUsers = async (req, res) => {
  const allUsers = await User.find();

  res.status(200).json({
    success: true,
    message: "All users",
    data: allUsers,
  });
};

export const getProducts = async (req, res) => {
  const allProducts = await Product.find();

  res.status(200).json({
    success: true,
    message: "All products",
    data: allProducts,
  });
};

export const getOrders = async (req, res) => {
  const allOrders = await Order.find();

  res.status(200).json({
    success: true,
    message: "All orders",
    data: allOrders,
  });
};

export const getCategories = async (req, res) => {
  const allCategories = await Category.find();

  res.status(200).json({
    success: true,
    message: "All categories",
    data: allCategories,
  });
};
export const getCarts = async (req, res) => {
  const allCarts = await Cart.find();

  res.status(200).json({
    success: true,
    message: "All carts",
    data: allCarts,
  });
};
