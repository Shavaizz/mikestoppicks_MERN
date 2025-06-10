import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
const SearchBar = () => {
	const [searchTerm, setSearchTerm] = useState(""); 
	const navigate = useNavigate(); 
	const handleChange = (e) => {
		setSearchTerm(e.target.value); 
	};
	const handleButtonClick = () => {
		if (searchTerm.trim()) {
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
				<button id="search-bar-click-button" type="button" onClick={handleButtonClick}>
					Search
				</button>
			</div>
		</>
	);
};

export default SearchBar;
