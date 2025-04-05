import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();
import Category from "../model/category.js";
import User from "../model/user.js";

export const createCategory = async (req, res) => {
  try {
    // console.log(req);
    const existingCategory = await Category.findOne({ name: req.body.name });
    if (existingCategory) {
      throw new Error("Category already exists");
    }

    if (!req.body.name || !req.body.description) {
      throw new Error("Category details not provided");
    }

    const category = new Category(req.body);
    await category.save();
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    console.error(error.message);
    if (!res.headersSent)
      res.status(400).json({
        success: false,
        message: error.message,
      });
    //console.log(error);
  }
};

export const getCategory = async (req, res) => {
  try {
    // console.log(req);

    const name = req.body.name;
    const description = req.body.description;

    const existingCategory = await Category.findOne({ name: name });
    if (!existingCategory) {
      throw new Error("Category not found");
    }
    const isMatch = (name, existingCategory.name);

    if (!isMatch) {
      throw new Error("Category Name not found");
    }
    const payload = {
      id: existingCategory._id,
      name: existingCategory.name,
      description: existingCategory.description,
    };

    const secret = process.env.JWT_SECRET;
    const jwtOptions = { expiresIn: "20d" };

    const token = jwt.sign(payload, secret, jwtOptions);
    res.status(200).json({
      success: true,
      message: `Category ${existingCategory.name} successfully fetched`,
      data: existingCategory,
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

export const updateCategory = async (req, res) => {
  try {
    const name = req.body.name;
    const updates = req.body;

    const existingCategory = await Category.findOneAndUpdate(
      { name: name },
      updates,
      { new: true },
    );
    if (!existingCategory) {
      throw new Error("Category not found");
    }
    res.status(200).json({
      success: true,
      message: `Category ${existingCategory.name} successfully updated`,
      data: existingCategory,
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

export const deleteCategory = async (req, res) => {
  try {
    const name = req.body.name;
    const remove = req.body;

    const existingCategory = await Category.findOneAndDelete(
      { name: name },
      remove,
      { new: true },
    );
    if (!existingCategory) {
      throw new Error("Category not found");
    }
    res.status(200).json({
      success: true,
      message: `Category ${existingCategory.name} successfully deleted`,
      data: existingCategory,
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
