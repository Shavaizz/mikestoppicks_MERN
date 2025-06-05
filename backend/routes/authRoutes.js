import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import protect from "../middleware/authenticateToken.js";
import authAdmin from "../middleware/authenticateAdmin.js";
const router = express.Router();

router.get("/users-list", protect, authAdmin, async (req, res) => {
	try {
		const users = await User.find({});
		return res.status(200).json({
			user_count: users.length,
			users: users,
		});
	} catch (error) {
		res.status(500).json({ message: "Error Fetching Users.", error });
	}
});
router.get("/user/:id", protect, authAdmin, async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findOne({ _id: id });
		console.log("Tried here")
		if (!user) {
			console.log(
				`User: ${req.user} tried access data for a user with id: ${id}, but this user doesn't exist!`
			);
			return res.status(404).send("User with this ID doesn't exist!");
		}
		console.log(
			`User: ${req.user.id} tried to access data for a user with id: ${id}`
		);
		return res.status(200).json({
			message: "User found successfully!",
			user: user,
		});
	} catch (error) {
		res.status(500).json({ message: "Error Fetching User", error });
	}
});
router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign(
				{ id: user._id, isAdmin: user.userisadmin },
				process.env.JWT_SECRET,
				{ expiresIn: "1h" }
			);
			res.status(200).json({
				user: {
					id: user._id,
					isAdmin: user.userisadmin,
					username: user.username,
					usernick: user.usernick,
				},
				token,
			});
		} else {
			res.status(401).json({ message: "Invalid username or password" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error logging in.", error });
	}
});

router.post("/register", async (req, res) => {
	try {
		const { username, email, password, userisadmin, usernick } = req.body;
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({
			username,
			email,
			password: hashedPassword,
			userisadmin,
			usernick,
		});
		await newUser.save();
		res.status(201).json({ message: "User created successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error creating user", error });
	}
});
router.post("/logout", (req, res) => {
	res.status(200).json({ message: "Logged out successfully" });
});
router.delete("/delete/:id", async(req,res)=>{
	try {
		const {id} = req.params;
		const deletedUser = await User.deleteOne({_id:id});
		if(!deletedUser){
			return res.status(404).send("User can't be deleted, no user with this id exists!");
		}
		return res.status(200).send("User has been deleted successfully!");
	} catch (error) {
		res.status(500).json({ message: "Error creating user", error });
	}
});
export default router;
