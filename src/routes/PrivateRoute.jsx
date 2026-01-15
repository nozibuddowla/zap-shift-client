import React from 'react';
import useAuth from '../hooks/useAuth';
import LoadingPage from '../components/LoadingPage/LoadingPage';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <LoadingPage />
    }

    if (!user) {
        return <Navigate to="/signin"  />;
    }
    return children;
};

export default PrivateRoute;