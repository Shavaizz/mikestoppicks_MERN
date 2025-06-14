import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminSiderbar.css";
const AdminSiderbar = ({ user, setUser }) => {
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
					<ul className="link-items">
						<Link to="/splash">Dashboard</Link>
					</ul>
					<ul className="link-items">
						<Link to="/user-panel">User Panel</Link>
					</ul>
					<ul className="link-items">
						<Link to="/product-panel">Product Panel</Link>
					</ul>
					<ul className="link-items">
						<Link to="/order-panel">Order Panel</Link>
					</ul>
					<button id="logout-button" onClick={handleLogout}>
						Logout
					</button>
				</div>
				<div id="copyright-and-misc-wrapper">
					<p>
						All Rights Reserved
						<br /> Copyright 2025 MikesTopPicks
					</p>
				</div>
			</div>
		</>
	);
};

export default AdminSiderbar;
