import React from 'react';
import { Navigate } from 'react-router-dom';

const UserValidationRoute = ({ user, children }) => {
  if (!user) {
    // Redirect to login if the user is not logged in
    return <Navigate to="/login" />;
  }
  return children;
};

export default UserValidationRoute;
