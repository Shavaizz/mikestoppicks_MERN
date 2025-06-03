import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
const SearchBar = () => {
	const [searchTerm, setSearchTerm] = useState(""); // State to store search term
	const navigate = useNavigate(); // Hook to navigate programmatically

	const handleChange = (e) => {
		setSearchTerm(e.target.value); // Update the search term as user types
	};

	const handleButtonClick = () => {
		if (searchTerm.trim()) {
			// Navigate to search results page with search term as query parameter
			navigate(`/search-results?query=${encodeURIComponent(searchTerm)}`);
		}
		setSearchTerm("");
	};

	return (
		<>
			<div id="input-wrapper">
				<input
					type="search"
					name="search-box"
					id="product_search_bar"
					placeholder="Search Product"
					value={searchTerm}
					onChange={handleChange}
				/>
				<button type="button" onClick={handleButtonClick}>
					Search
				</button>
			</div>
		</>
	);
};

export default SearchBar;
