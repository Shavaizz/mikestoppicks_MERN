import React from 'react';
import { Navigate } from 'react-router-dom';
const UserValidationRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default UserValidationRoute;
