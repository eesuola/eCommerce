import mongoose from "mongoose";

const { Schema } = mongoose;

const CartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
}, { timestamps: true });

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
// This code defines a Mongoose schema for a shopping cart in an e-commerce application.