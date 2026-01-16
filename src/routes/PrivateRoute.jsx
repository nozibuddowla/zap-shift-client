import React from "react";
import useAuth from "../hooks/useAuth";
import LoadingPage from "../components/LoadingPage/LoadingPage";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
//   console.log("location: ", location);

  if (loading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <Navigate to="/signin" state={location.pathname} />;
  }
  return children;
};

export default PrivateRoute;
