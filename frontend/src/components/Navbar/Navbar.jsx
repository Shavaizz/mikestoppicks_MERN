import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminSiderbar from "../AdminSidebar/AdminSiderbar";
import UserNavbar from "../UserNavbar/UserNavbar";
import "./Navbar.css";
const Navbar = ({ user, setUser }) => {
	const navigate = useNavigate(); // Hook to navigate programmatically

	if (user && !user.isAdmin) {
		return <UserNavbar user={user} setUser={setUser} />;
	} else if (user && user.isAdmin) {
		return <AdminSiderbar user={user} setUser={setUser} />;
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
