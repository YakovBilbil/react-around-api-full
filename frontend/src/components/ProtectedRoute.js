import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, isLoggedIn }) => {
  return isLoggedIn ? element : <Navigate to="/react-around-auth/signin" />;
};

export default ProtectedRoute;
