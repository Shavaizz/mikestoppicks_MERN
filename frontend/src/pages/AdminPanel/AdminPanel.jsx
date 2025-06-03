import React, { useState, useEffect } from "react";
import AdminProductAddPanel from "../../components/AdminProductAddPanel/AdminProductAddPanel";
import AdminProductDeletePanel from "../../components/AdminProductDeletePanel/AdminProductDeletePanel";
import AdminProductEditPanel from "../../components/AdminProductEditPanel/AdminProductEditPanel";
import AdminProductList from "../../components/AdminProductList/AdminProductList";
import "./AdminPanel.css";
const AdminPanel = ({ user }) => {
	const [useradminname, setuseradminname] = useState("MikesTopPicks");
	useEffect(() => {
		if (user?.username) {
			setuseradminname(user.username);
		}
	}, [user]);
	return (
		<>
			<h2 className="AdminUserName">Welcome, {useradminname}</h2>
			<div className="AdminPanelComponentsWrapper">
				<AdminProductAddPanel />
				<AdminProductEditPanel />
				<AdminProductDeletePanel />
			</div>
			<h2 id="product-list-admin-h2">Product List:</h2>
			<AdminProductList />
		</>
	);
};

export default AdminPanel;
