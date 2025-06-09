import React, { useState, useEffect } from "react";
import "./UserList.css";
import api from "../../axiosinstance";
const UserList = () => {
	const [users, setUsers] = useState([]);
	const fetchUsers = async () => {
		try {
			const response = await api.get(
				"http://localhost:3000/api/user/users-list"
			);
			setUsers(response.data.users);
		} catch (error) {
			console.log("Error Occured:", error);
		}
	};
	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<>
			<div className="user-list-wrapper">
				<div className="User-list-del-panel">
					{users.map((user) => (
						<div key={user._id} className="User-item-for-del">
							<h3>Username: {user.username}</h3>
							<p>Email: {user.email}</p>
							<p>Nickname: {user.usernick}</p>
							<p>Admin: {user.userisadmin ? "Yes" : "No"}</p>
							<p>Created At: {new Date(user.createdAt).toLocaleString()}</p>
							<p>UserId: {user._id}</p>
						</div>
					))}
				</div>
				<div className="fetch-button-admin-panel">
					<button type="button" onClick={fetchUsers}>
						Refresh List
					</button>
				</div>
			</div>
		</>
	);
};

export default UserList;
