import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminSiderbar.css";
const AdminSiderbar = () => {
	return (
		<>
			<div className="sidebar-wrapper">
				<h2>Admin Panel</h2>
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
				</div>
			</div>
		</>
	);
};

export default AdminSiderbar;
