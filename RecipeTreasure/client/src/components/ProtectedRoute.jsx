import React from "react";
import { Navigate, Outlet } from "react-router";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  const navigate = useNavigate();

  if (!isAuthenticated) {
    console.log("user not authenticated");
    navigate("/login");
  }
  return <Outlet />;
};

export default ProtectedRoute;
