import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../../components/searchBar/SearchBar";
import "./SearchResultPage.css";
import api from "../../axiosinstance";
const SearchResultPage = () => {
	const [products, setProducts] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	const location = useLocation();
	const searchTerm = new URLSearchParams(location.search).get("query");
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await api.get(
					`/api/products/find/${searchTerm}`
				);
				console.log(response);
				if (response) {
					setProducts(response.data.product); 
				} else {
					setErrorMessage("Error fetching product data");
				}
			} catch (error) {
				setErrorMessage("Error fetching product data");
			}
		};
		if (searchTerm) {
			fetchProducts();
		}
	}, [searchTerm]);
	useEffect(() => {
		console.log("Updated Products:", products);
	}, [products]);
	return (
		<>
			<div className="heading-wrapper">
				<h2>Search Results: </h2>
			</div>
			<SearchBar />
			<div className="Product-list">
				{products.length > 0
					? products.map((product) => (
							<div key={product._id} className="Product-item">
								<h3>{product.title}</h3>
								<img src={product.image} alt={product.title} />
								<p>Price: ${product.price}</p>
							</div>
					  ))
					: !errorMessage && <p>No products to display</p>}
			</div>
		</>
	);
};

export default SearchResultPage;
