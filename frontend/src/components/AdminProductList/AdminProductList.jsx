import React, { useState, useEffect } from "react";
import "./AdminProductList.css";
import api from "../../axiosinstance";
const AdminProductList = () => {
	const [products, setProducts] = useState([]);
	const fetchProducts = async () => {
		const result = await api.get("/api/products/");

		setProducts(result.data.data);
	};
	useEffect(() => {
		fetchProducts();
	}, []);
	return (
		<>
			<div className="Product-list-del-panel">
				{products.map((product) => (
					<div key={product._id} className="Product-item-for-del">
						<img
							src={product.image}
							alt={product.title}
							className="Product-img"
						/>
						<div className="Product-details">
							<h3>{product.title}</h3>
							<p>Price: ${product.price}</p>
							<p>Created At: {new Date(product.createdAt).toLocaleString()}</p>
							<p>Id: {product._id}</p>
						</div>
					</div>
				))}
			</div>
			<div className="fetch-button-admin-panel">
				<button type="button" onClick={fetchProducts}>
					Fetch Products
				</button>
			</div>
		</>
	);
};

export default AdminProductList;
