import React from "react";
import { useState } from "react";
import api from "../../axiosinstance";
import "./AdminProductAddPanel.css";
const AdminProductAddPanel = () => {
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState(0);
	const [url, setUrl] = useState("");
	const formHandle = async (e) => {
		try {
			e.preventDefault(); // Prevent page reload
			const request = await api.post(
				"/api/products/create",
				{
					price: price,
					image: url,
					title: title,
				}
			);
			setTitle("");
			setPrice(0);
			setUrl("");
		} catch (error) {
			console.log("Error Occured:", error);
		}
	};
	return (
		<>
			<div className="product-creation-form-wrapper">
				<form className="product-form">
					<h2 id="product-form-h2">Create A New Product</h2>
					<label
						htmlFor="title"
						className="title-form-add-product-panel"
						id="title-label-add-product-panel"
					>
						Title:
					</label>
					<input
						value={title}
						className="title-form-add-product-panel"
						id="title-input-add-product-panel"
						onChange={(e) => {
							setTitle(e.target.value);
						}}
						type="text"
						name="title"
						required
					/>

					<label
						htmlFor="price"
						className="price-form-add-product-panel"
						id="price-label-add-product-panel"
					>
						Price:
					</label>
					<input
						value={price}
						className="price-form-add-product-panel"
						id="price-input-add-product-panel"
						onChange={(e) => {
							setPrice(e.target.value);
						}}
						type="number"
						name="price"
						required
					/>

					<label
						htmlFor="image"
						className="image-form"
						id="image-label-add-product-panel"
					>
						Image URL:
					</label>
					<input
						value={url}
						onChange={(e) => {
							setUrl(e.target.value);
						}}
						type="url"
						className="image-form-add-prodcut-panel"
						id="image-input-add-product-panel"
						name="image"
						required
					/>

					<button
						id="product-add-form-button"
						type="submit"
						onClick={(e) => {
							formHandle(e);
						}}
					>
						Submit
					</button>
				</form>
			</div>
		</>
	);
};

export default AdminProductAddPanel;
