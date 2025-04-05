import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a product name"],
    },
    price: {
      type: Number,
      required: [true, "Please enter a product price"],
    },
    currency: {
      type: String,
      required: [true, "Please enter a product currency"],
    },
    description: {
      type: String,
      required: [true, "Please enter a product description"],
    },
    category: {
      type: String,
      required: [true, "Please enter a product category"],
    },
    image: { type: String },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
