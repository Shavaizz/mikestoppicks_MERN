import express from "express";
import { Cart } from "../models/CartModel.js";
import { Product } from "../models/productModel.js";
import { User } from "../models/userModel.js";
import protect from "../middleware/authenticateToken.js";
import authAdmin from "../middleware/authenticateAdmin.js";
const router = express.Router();
// Get all current carts. Need to be admin to interact 
// ADMIN ROUTE
router.get("/",protect,authAdmin, async (req, res) => {
	try {
		const carts = await Cart.find({});
		const users = await User.find({});
		return res.status(200).json({
			count: carts.length,
			carts: carts,
		});
	} catch (error) {
		console.log("Error:", error);
	}
});
// Add to cart route, only need to be admin
// ADMIN ROUTE
router.post("/add",protect, async (req, res) => {
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
router.get("/:userId",protect, async (req, res) => {
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
router.delete("/remove",protect, async (req, res) => {
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
router.delete("/clear/:userId",protect, async (req, res) => {
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
