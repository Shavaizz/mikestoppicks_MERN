import express from "express";
import { Product } from "../models/productModel.js";
const router = express.Router();

// Create Product
router.post("/create", async (req, res) => {
	try {
		if (!req.body.title || !req.body.price) {
			return res.status(400).send({
				message: "Provide all required fields",
			});
		}
		const newProd = {
			title: req.body.title,
			price: req.body.price,
			image: req.body.image,
		};
		const prod = await Product.create(newProd);
		return res.status(200).send(prod);
	} catch (error) {
		console.log(error);
		res.status(500).send({
			message: error.message,
		});
	}
});

// Retrieve All Products
router.get("/", async (req, res) => {
	try {
		const products = await Product.find({});
		return res.status(200).json({
			count: products.length,
			data: products,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send({ message: error.message });
	}
});

// Update Product
router.put("/update/:id", async (req, res) => {
	try {
		if (!req.body.title || !req.body.price) {
			return res
				.status(400)
				.send({ message: "Provide all required fields to continue" });
		}
		const { id } = req.params;
		const result = await Product.findByIdAndUpdate(id, req.body);
		if (!result) {
			return res.status(404).send({ message: "Product not found" });
		}
		{
			return res.status(200).send({
				message: "Product Updated Successfully!",
				data: result,
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({ message: error.message });
	}
});

// Delete Product
router.delete("/delete/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const result = await Product.findByIdAndDelete(id, req.body);
		const products = await Product.find({});
		if (!result) {
			return res.status(404).send({ message: "Product Not Found" });
		}
		{
			return res.status(200).json({
				message: "Product Deleted Successfully",
				count: products.length,
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({ message: error.message });
	}
});

// Find Product By Name
router.get("/find/:name", async (req, res) => {
	try {
		const { name } = req.params;
		const result = await Product.find({
			title: { $regex: name, $options: "i" },
		});
		if (result.length > 0) {
			res.status(200).send({ product: result });
		} else {
			res.status(404).send({ message: "Product Not Found" });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({ message: error.message });
	}
});

export default router;
