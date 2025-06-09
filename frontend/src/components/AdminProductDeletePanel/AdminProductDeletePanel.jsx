import React from "react";
import { useState } from "react";
import api from '../../axiosinstance'
import "./AdminDeletePanel.css";
const AdminProductDeletePanel = () => {
	const [productId, setProductId] = useState("");
	const [deletionMessage, setDeletionMessage] = useState("");

	const handleDeletion = async () => {
		try {
			const deleteRequest = await api.delete(
				`http://localhost:3000/api/products/delete/${productId}`
			); // Delete All Products
			setProductId("");
			fetchProducts();
			setDeletionMessage("The Product Has Been Deleted Sucssessfully!");
		} catch (error) {
			console.log("Error Occured:", error);
			setDeletionMessage("Product Deletion Failed");
		}
	};
	return (
		<>
			<div className="product-deletion-form-wrapper">
				<form className="product-del-form">
				<h2 id="product-del-form-h2">Product Deletion Form</h2>
					<label htmlFor="productId" id="product-id-form-delete-panel">
						Product Id:
					</label>
					<input
						value={productId}
						onChange={(e) => {
							setProductId(e.target.value);
						}}
						type="text"
						id="product-id-input-delete-panel"
						name="productId"
						required
					/>
					<button
						id="product-del-form-button"
						type="button"
						onClick={handleDeletion}
					>
						Submit
					</button>
				</form>
				<p>{deletionMessage}</p>
			</div>
		</>
	);
};

export default AdminProductDeletePanel;
