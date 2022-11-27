import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import localStorageHelper from "@utils/localStrogeHelper";
const RequireAuth = ({ children }) => {
  const location = useLocation();
  const token = localStorageHelper.load("token");
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
