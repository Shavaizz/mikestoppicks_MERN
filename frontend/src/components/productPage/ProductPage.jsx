import React from "react";
import { useState, useEffect } from "react";
import './ProductPage.css'
import api from "../../axiosinstance";
const ProductPage = (user) => {
	const [products, setProducts] = useState([]);
	const [userId, setUserId] = useState(null);
	const [productId, setProductId] = useState(null);
	const [quantity, setQuantity] = useState(1);
	useEffect(() => {
		const fetchProducts = async () => {
			const result = await fetch("http://localhost:3000/api/products/");
			const jsonResult = await result.json();
			setProducts(jsonResult.data);
		};
		fetchProducts();
	}, []);
	const addToCart = (id)=>{
		setProductId(id);
		const userIdMan = user.user?.id; 
		const request = api.post("http://localhost:3000/api/cart/add",{
			userId:userIdMan,
			productId:productId,
			quantity:quantity
		})
	}
	return (
		<>
			<div className="Product-list">
				{products.map((product) => (
					<div key={product._id} className="Product-item">
						<h3 id="product-name">{product.title}</h3>
						<img id="product-img" src={product.image} />
						<p id="product-price">Price: ${product.price}</p>
						<button type="button" onClick={()=>{addToCart(product._id)}}>Add To Cart</button>
					</div>
				))}
			</div>
		</>
	);
};
export default ProductPage;
