import React from "react";
import { Link } from "react-router-dom";
import AdminSiderbar from "../AdminSidebar/AdminSiderbar";
import UserNavbar from "../UserNavbar/UserNavbar";
import "./Navbar.css";
const Navbar = ({ user, setUser }) => {
	if (user && !user.isAdmin) {
		return <UserNavbar user={user} setUser={setUser} />;
	} else if (user && user.isAdmin) {
		return (
			<div className="admin-layout">
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
						<p>
							All Rights Reserved
							<br /> Copyright 2025 MikesTopPicks
						</p>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="navbar-wrapper">
				<h2 id="mike-heading">Website</h2>
				<nav className="navbar-nav">
					<ul id="navbar-ul-wrapper">
						<ul>
							<Link to="/">Home</Link>
						</ul>
						{!user && (
							<ul>
								<Link to="/login">Login</Link>
							</ul>
						)}
						{!user && (
							<ul>
								<Link to="/register">Register</Link>
							</ul>
						)}
					</ul>
				</nav>
			</div>
		);
	}
};

export default Navbar;
