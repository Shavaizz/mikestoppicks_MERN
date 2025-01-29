import React from "react";
import { useState, useEffect } from "react";
import './ProductPage.css'
const ProductPage = () => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		const fetchProducts = async () => {
			const result = await fetch("http://localhost:3000/api/products/");
			const jsonResult = await result.json();

			setProducts(jsonResult.data);
		};
		fetchProducts();
	}, []);

	return (
		<>
			<div className="Product-list">
				{products.map((product) => (
					<div key={product._id} className="Product-item">
						<h3 id="product-name">{product.title}</h3>
						<img id="product-img" src={product.image} />
						<p id="product-price">Price: ${product.price}</p>
						<button type="button">Add To Cart</button>
					</div>
				))}
			</div>
		</>
	);
};
export default ProductPage;
