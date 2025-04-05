import mongoose from "mongoose";

const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a category name"],
    },
    description: {
      type: String,
      required: [true, "Please enter a category description"],
    },
    image: { type: String },
  },
  { timestamps: true },
);

const Category = mongoose.model("Category", CategorySchema);
export default Category;
// This code defines a Mongoose schema for a product category in an e-commerce application.
