import React, { useState } from "react";
import api from "../../axiosinstance";
import "./AdminUserDelete.css";
const AdminUserDelete = () => {
	const [userId, setUserId] = useState("");
	const deleteUser = async (id) => {
		try {
			api.delete(`/api/user/delete/${id}`);
		} catch (error) {
			console.log(
				`Error encountered, while trying to delete user, Error: ${error}`
			);
		}
	};
	return (
		<>
			<div className="user-delete-form-wrapper">
				<h2 id="user-delete-form-h2">Delete A User</h2>
				<p>Make sure to refresh list after deleting a user!</p>
				<form className="user-deletion-form">
					<label htmlFor="user-signup-username">UserId: </label>
					<input
						name="userid-feild"
						type="text"
						id="user-deletion-id"
						value={userId}
						onChange={(e) => {
							setUserId(e.target.value);
						}}
						required
					/>
					<button
						type="submit"
						id="user-delete-submit-button"
						onClick={(e) => {
							e.preventDefault();
							deleteUser(userId);
							setUserId("");
						}}
					>
						Submit
					</button>
				</form>
			</div>
		</>
	);
};

export default AdminUserDelete;
