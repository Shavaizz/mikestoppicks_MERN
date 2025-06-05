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
			<div className="AdminPanelComponentsWrapper">
				<div id="sub-wrapper-for-heading">
				<div id="wrapper-1">
					
					<AdminProductAddPanel />
					<div id="item-2">
						<AdminProductDeletePanel />
					</div>
				</div>
				<div id="wrapper-2">
					<AdminProductEditPanel />
				</div>
				</div>
				<div id="wrapper-3">
					<AdminProductList />
				</div>
			</div>
		</>
	);
};

export default AdminPanel;
