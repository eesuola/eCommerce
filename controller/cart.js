import carts from '../models/cart.js';
import mongoose from 'mongoose';
import Product from '../models/product.js';
import User from '../models/user.js';


const createCart = async (req, res) => {
    try {
        const { userId, products } = req.body;
        const cart = new carts({ user: userId, products });
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
