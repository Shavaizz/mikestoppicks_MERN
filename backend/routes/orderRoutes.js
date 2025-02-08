import express from "express";
import { Cart } from "../models/CartModel.js";
import { Order } from "../models/orderModel.js";
const router = express.Router();

router.post("/create", async (req, res) => {
	try {
		const { userId, totalAmount, status } = req.body;
		if (!userId || !totalAmount) {
			return res.status(400).send({ message: "Provide all required fields" });
		}
		const cart = await Cart.findOne({ userId }).populate("items.productId");
		if (!cart || cart.items.length === 0) {
			return res.status(404).send({ message: "Cart is empty or not found" });
		}
		const items = cart.items.map((item) => ({
			productId: item.productId._id, // Ensure it's just the ObjectId
			quantity: item.quantity,
		}));
		const newOrder = new Order({
			userId,
			items,
			totalAmount, // Pass from the request or calculate dynamically if needed
			status: status || "Pending", // Default status to "Pending"
		});
		const savedOrder = await newOrder.save();
		await Cart.findOneAndDelete({ userId });
		res
			.status(200)
			.send({ message: "Order created successfully", order: savedOrder });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
});
router.get("/:userId", async (req, res) => {
	try {
		const { userId } = req.params;
		const orders = await Order.find({ userId }).populate("items.productId");
		if (!orders || orders.length === 0) {
			return res.status(404).send({ message: "No orders found for this user" });
		}
		res.status(200).send(orders);
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
});
router.get("/", async (req, res) => {
	try {
		const orders = await Order.find({});
		return res.status(200).json({
			count: orders.length,
			orders: orders,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
});

router.get("/find/:status", async (req, res) => {
	try {
		const { status } = req.params;
		const orders = await Order.find({ status });
		return res.status(200).json({
			count: orders.length,
			orders: orders,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
});
router.put("/update/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { status } = req.body;
		if (!status) {
			return res.status(400).send({ message: "Provide a status to update" });
		}
		const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
		if (!order) {
			return res.status(404).send({ message: "Order not found" });
		}
		res
			.status(200)
			.send({ message: "Order status updated successfully", order });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
});

router.delete("/delete/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const order = await Order.findByIdAndDelete(id);
		if (!order) {
			return res.status(404).send({ message: "Order not found" });
		}
		res.status(200).send({ message: "Order deleted successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
});

export default router;
