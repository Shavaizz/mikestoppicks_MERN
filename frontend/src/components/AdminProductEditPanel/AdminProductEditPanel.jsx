import React, { useState } from "react";
import api from "../../axiosinstance";
import "./AdminProductEditPanel.css";
const AdminProductEditPanel = () => {
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState(0);
	const [url, setUrl] = useState("");
	const [productId, setProductId] = useState("");
	const editProduct = async (e) => {
		e.preventDefault();
		await api.put(`/api/products/update/${productId}`, {
			price: price,
			image: url,
			title: title,
		});
		setTitle("");
		setPrice(0);
		setUrl("");
		setProductId("");
	};
	return (
		<>
			<div className="product-edit-form-wrapper">
				<form className="product-edit-form">
					<h2 id="product-edit-form-h2">Edit Products</h2>
					<label htmlFor="title-edit">Title:</label>
					<input
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
						type="text"
						id="title-edit"
						name="title"
						required
					/>

					<label htmlFor="price-edit">Price:</label>
					<input
						value={price}
						onChange={(e) => {
							setPrice(e.target.value);
						}}
						type="number"
						id="price-edit"
						name="price"
						required
					/>

					<label htmlFor="image-edit">Image URL:</label>
					<input
						value={url}
						onChange={(e) => {
							setUrl(e.target.value);
						}}
						type="url"
						id="image-edit"
						name="image"
						required
					/>

					<label htmlFor="productId">Product Id:</label>
					<input
						value={productId}
						onChange={(e) => {
							setProductId(e.target.value);
						}}
						type="text"
						id="productId"
						name="productId"
						required
					/>

					<button
						type="submit"
						id="product-edit-form-button"
						onClick={(e) => {
							editProduct(e);
						}}
					>
						Submit
					</button>
				</form>
			</div>
		</>
	);
};

export default AdminProductEditPanel;
