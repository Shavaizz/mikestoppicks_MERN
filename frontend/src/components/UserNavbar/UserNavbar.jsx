import React from "react";
import { Link } from "react-router-dom";
import "./UserNavbar.css";
const UserNavbar = ({ user, setUser }) => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		setUser(null);
		navigate("/login");
	};
	return (
		<>
			<nav className="navbar-nav">
				<ul id="user-nav-wrapper">
					<ul>
						<Link to="/cart">Cart</Link>
					</ul>
					<ul>
						<Link to="/orders">Orders</Link>
					</ul>
					<ul>
						<button id="logout-button" onClick={handleLogout}>
							Logout
						</button>
					</ul>
				</ul>
			</nav>
		</>
	);
};

export default UserNavbar;
