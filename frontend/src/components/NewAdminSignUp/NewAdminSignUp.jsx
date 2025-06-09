import React, { useState } from "react";
import api from "../../axiosinstance";
import "./AdminSignUp.css";
const NewAdminSignUp = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userisadmin, setUserIsAdmin] = useState(true);
	const [usernick, setUserNick] = useState("");
	const [completionMessage, setCompletionMessage] = useState("");
	const makeNewUser = async (e) => {
		e.preventDefault();
		const request = await api.post("http://localhost:3000/api/user/register", {
			username: username,
			email: email,
			password: password,
			userisadmin: userisadmin,
			usernick: usernick,
		});
		const response = request.status;
		setCompletionMessage(
			`User Created Successfully, UserName:${username}, Password:${password}`
		);
		setUsername("");
		setEmail("");
		setPassword("");
		setUserNick("");
		setCompletionMessage("User Created Successfully");
	};
	return (
		<div className="admin-creation-form-wrapper">
			<h2 id="admin-creation-form-h2">Create Admin</h2>
			<form className="admin-creation-form">
				<label htmlFor="admin-signup-username">Username: </label>
				<input
					name="username-feild"
					type="text"
					id="admin-signup-username"
					value={username}
					onChange={(e) => {
						setUsername(e.target.value);
					}}
					required
				/>
				<label htmlFor="admin-signup-username">Email: </label>
				<input
					name="email-feild"
					type="text"
					id="admin-signup-email"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					required
				/>
				<label htmlFor="admin-signup-username">User Nickname: </label>
				<input
					name="adminnick-feild"
					type="text"
					id="admin-signup-nickname"
					value={usernick}
					onChange={(e) => {
						setUserNick(e.target.value);
					}}
				/>
				<label htmlFor="admin-signup-password">Password: </label>
				<input
					name="usernick-feild"
					type="password"
					id="admin-signup-password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					required
				/>
				<button
					type="submit"
					id="uadminsignup-submit-button"
					onClick={(e) => {
						makeNewUser(e);
					}}
				>
					Submit
				</button>
			</form>
			<p>{completionMessage}</p>
		</div>
	);
};

export default NewAdminSignUp;
