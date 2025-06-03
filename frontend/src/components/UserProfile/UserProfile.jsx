import React, { useState, useEffect } from "react";
import "./UserProfile.css";
const UserProfile = ({ user }) => {
	const [useradminname, setuseradminname] = useState("MikesTopPicks");
	useEffect(() => {
		if (user?.username) {
			setuseradminname(user.username);
		}
	}, [user]);
	return (
		<>
			<div className="complete-wrapper">
				<div className="user-wrapper">
					<img
						src="https://placehold.co/200x200"
						alt="adminuser"
						id="image-user"
					/>
					<h2>{useradminname}</h2>
				</div>
				<div className="social-wrapper">
					<ul>
						<img src="https://placehold.co/40x40" alt="facebook" />
						<img src="https://placehold.co/40x40" alt="twitter" />
						<img src="https://placehold.co/40x40" alt="tiktok" />
						<img src="https://placehold.co/40x40" alt="pinterest" />
					</ul>
				</div>
			</div>
		</>
	);
};

export default UserProfile;
