import React from "react";
import NewAdminSignUp from "../../components/NewAdminSignUp/NewAdminSignUp";
import NewUserSignUp from "../../components/NewUserSignUp/NewUserSignUp";
import UserList from "../../components/UserList/UserList";
import AdminUserDelete from "../../components/AdminUserDelete/AdminUserDelete";
import "./Signup.css";
const AdminPanelSignUpPages = () => {
	return (
		<>
			<div className="multi-user-sign-up-wrapper">
				<NewAdminSignUp />
				<NewUserSignUp />
				<AdminUserDelete />
			</div>
			<div className="user-list-page-wrapper">
				<UserList />
			</div>
		</>
	);
};

export default AdminPanelSignUpPages;
