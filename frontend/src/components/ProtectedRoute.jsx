import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
	if (!user || !user.isAdmin) {
		// Redirect to login if the user is not logged in or not an admin
		return <Navigate to="/login" />;
	}
	return children;
};

export default ProtectedRoute;
