import express from "express";
import { Cart } from "../models/CartModel.js"; // Assuming you've created a Cart model
import { Product } from "../models/productModel.js"; // To validate product existence

const router = express.Router();

// Add to Cart
router.post("/add", async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || !quantity) {
            return res.status(400).send({ message: "Provide all required fields" });
        }

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        // Find or create the cart for the user
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // Check if the product is already in the cart
        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

        if (itemIndex > -1) {
            // If the product is already in the cart, update the quantity
            cart.items[itemIndex].quantity += quantity;
        } else {
            // Otherwise, add the product to the cart
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).send({ message: "Cart updated", cart });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

// View Cart
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOne({ userId }).populate("items.productId");
        if (!cart) {
            return res.status(404).send({ message: "Cart not found" });
        }

        res.status(200).send(cart);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

// Update Cart Item Quantity
router.put("/update", async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || quantity == null) {
            return res.status(400).send({ message: "Provide all required fields" });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).send({ message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).send({ message: "Product not in cart" });
        }

        cart.items[itemIndex].quantity = quantity;
        await cart.save();

        res.status(200).send({ message: "Cart updated", cart });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

// Clear Cart
router.delete("/clear/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.findOneAndDelete({ userId });
        if (!cart) {
            return res.status(404).send({ message: "Cart not found" });
        }

        res.status(200).send({ message: "Cart cleared" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

export default router;
