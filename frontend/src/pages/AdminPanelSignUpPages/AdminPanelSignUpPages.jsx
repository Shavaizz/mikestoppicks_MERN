import React from "react";
import NewAdminSignUp from "../../components/NewAdminSignUp/NewAdminSignUp";
import NewUserSignUp from "../../components/NewUserSignUp/NewUserSignUp";
import UserList from "../../components/UserList/UserList";
import "./Signup.css";
const AdminPanelSignUpPages = () => {
	return (
		<>
			<div className="multi-user-sign-up-wrapper">
				<NewAdminSignUp />
				<NewUserSignUp />
			</div>
			<UserList />
		</>
	);
};

export default AdminPanelSignUpPages;
