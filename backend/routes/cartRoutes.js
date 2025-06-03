import express from "express";
import { Cart } from "../models/CartModel.js";
import { Product } from "../models/productModel.js";
import protect from "../middleware/authenticateToken.js";
const router = express.Router();

// Add to cart route, only need to be admin
// USER ROUTE
router.post("/add", protect, async (req, res) => {
	try {
		const { userId, productId, quantity } = req.body;

		if (!userId || !productId || !quantity) {
			return res.status(400).send({ message: "Provide all required fields" });
		}

		const product = await Product.findById(productId);
		if (!product) {
			return res.status(404).send({ message: "Product not found" });
		}
		let cart = await Cart.findOne({ userId });
		if (!cart) {
			cart = new Cart({ userId, items: [] });
		}
		const itemIndex = cart.items.findIndex(
			(item) => item.productId.toString() === productId
		);
		if (itemIndex > -1) {
			cart.items[itemIndex].quantity += quantity;
		} else {
			cart.items.push({ productId, quantity });
		}

		await cart.save();
		res.status(200).send({ message: "Cart updated", cart });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
});
// Get cart for specific user
// USER ROUTE
router.get("/:userId", protect, async (req, res) => {
	try {
		const { userId } = req.params;

		const cart = await Cart.findOne({ userId }).populate("items.productId");
		if (!cart || cart.items.length === 0) {
			return res.status(404).send({ message: "Cart not found" });
		}
		res.status(200).send(cart);
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
});
// USER ROUTE
router.put("/update", protect, async (req, res) => {
	try {
		const { userId, productId, quantity } = req.body;

		if (!userId || !productId || quantity == null) {
			return res.status(400).send({ message: "Provide all required fields" });
		}

		const cart = await Cart.findOne({ userId });
		if (!cart) {
			return res.status(404).send({ message: "Cart not found" });
		}

		const itemIndex = cart.items.findIndex(
			(item) => item.productId.toString() === productId
		);
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

// Remove product from cart
// USER ROUTE
router.delete("/remove", protect, async (req, res) => {
	try {
		const { userId, productId } = req.body;

		if (!userId || !productId) {
			return res.status(400).send({ message: "Provide all required fields" });
		}
		const cart = await Cart.findOne({ userId });
		if (!cart) {
			return res.status(404).send({ message: "Cart not found" });
		}
		const itemIndex = cart.items.findIndex(
			(item) => item.productId.toString() === productId
		);
		if (itemIndex === -1) {
			return res.status(404).send({ message: "Product not found in cart" });
		}
		cart.items.splice(itemIndex, 1);
		await cart.save();
		res.status(200).send({ message: "Product removed from cart", cart });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
});

// Clear out cart
// User Route
router.delete("/clear/:userId", protect, async (req, res) => {
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
