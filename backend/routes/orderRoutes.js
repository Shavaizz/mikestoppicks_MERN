import express from "express";
import { Cart } from "../models/CartModel.js";
import { Order } from "../models/orderModel.js";
import authAdmin from "../middleware/authenticateAdmin.js";
import protect from "../middleware/authenticateToken.js";
const router = express.Router();

// User Route
router.post("/create",protect, async (req, res) => {
	try {
		const { user, status } = req.body;
		if (!user) {
			return res.status(400).send({ message: "User ID is required" });
		}
		const cart = await Cart.findOne({ userId: user }).populate("items.productId");
		if (!cart) {
			console.log("Cart Data:", cart);
			return res.status(404).send({ message: "Cart is empty or not found" });
		}
		const totalAmount = cart.items.reduce((sum, item) => {
			return sum + item.productId.price * item.quantity; // Ensure 'price' is in the Product model
		}, 0);
		const items = cart.items.map((item) => ({
			productId: item.productId._id, 
			quantity: item.quantity,
		}));
		const newOrder = new Order({
			user,
			items,
			totalAmount, 
			status: status || "Pending", 
		});
		const savedOrder = await newOrder.save();
		await Cart.findOneAndDelete({ userId: user });
		res
			.status(200)
			.send({ message: "Order created successfully", order: savedOrder });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
});
// User Route
router.get("/:userId", protect,async (req, res) => {
	try {
		const { userId } = req.params;
		const orders = await Order.find({ user:userId }).populate({
			path:"items.productId",
			select:"title price "
		});
		if (!orders || orders.length === 0) {
			return res.status(404).send({ message: "No orders found for this user" });
		}
		res.status(200).send(orders);
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error.message });
	}
});
// User Route
router.delete("/delete/:id",protect, async (req, res) => {
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

// Admin Route ( Get All Orders)
router.get("/", protect ,async (req, res) => {
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
// Admin Route (Find Status For Specific Order)
router.get("/find/:status",protect, authAdmin, async (req, res) => {
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
// Admin Route (Update status of order)
router.put("/update/:id", protect,authAdmin,async (req, res) => {
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


export default router;
