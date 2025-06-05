import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminSiderbar.css";
const AdminSiderbar = ({user, setUser}) => {
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("token");
		setUser(null);
		navigate("/login");
	};
	return (
		<>
			<div className="sidebar-wrapper">
				<h2>MikesTopPicks</h2>
				<div id="links">
					<a className="link-items">
						<Link to="/user-panel">User Panel</Link>
					</a>
					<a className="link-items">
						<Link to="/product-panel">Product Panel</Link>
					</a>
					<a className="link-items">
						<Link to="/order-panel">Order Panel</Link>
					</a>
					<button id="logout-button" onClick={handleLogout}>
						Logout
					</button>
				</div>
				<div id="copyright-and-misc-wrapper">
					<p>All Rights Reserved<br/> Copyright 2025 MikesTopPicks</p>
				</div>
			</div>
		</>
	);
};

export default AdminSiderbar;
