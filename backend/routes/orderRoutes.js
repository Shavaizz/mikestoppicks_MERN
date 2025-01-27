import express from "express";
import { Order } from "../models/orderModel.js"; // Assuming you have an Order model
const router = express.Router();

// Create Order ( WORKING )
router.post("/create", async (req, res) => {
    try {
        const { userId, items, totalAmount, status } = req.body;

        if (!userId || !items || items.length === 0 || !totalAmount) {
            return res.status(400).send({ message: "Provide all required fields" });
        }

        const newOrder = new Order({
            userId,
            items,
            totalAmount,
            status: status || "Pending", // Default status to "Pending"
        });

        const savedOrder = await newOrder.save();
        res.status(200).send({ message: "Order created successfully", order: savedOrder });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

// Get Orders for a User ( WORKING )
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

// Update Order Status ( WORKING )
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

        res.status(200).send({ message: "Order status updated successfully", order });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

// Delete an Order ( WORKING )
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
