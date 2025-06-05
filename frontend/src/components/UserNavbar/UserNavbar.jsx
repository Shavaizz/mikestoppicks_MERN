import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserNavbar.css";
const UserNavbar = ({ user, setUser }) => {
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("token");
		setUser(null);
		navigate("/login");
	};
	return (
		<>
			<div className="navbar-wrapper">
				<h2 id="mike-heading">Website</h2>

				<nav className="navbar-nav">
					<ul id="navbar-ul-wrapper">
						<ul>
							<Link to="/">Home</Link>
						</ul>
						<ul>
							<Link to="/cart">Cart</Link>
						</ul>
						<ul>
							<Link to="/orders">Orders</Link>
						</ul>
						<ul>
							<button id="logout-button-nav" onClick={handleLogout}>
								Logout
							</button>
						</ul>
					</ul>
				</nav>
			</div>
		</>
	);
};

export default UserNavbar;
