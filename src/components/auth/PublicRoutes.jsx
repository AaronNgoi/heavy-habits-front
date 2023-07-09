import React, {  useContext } from 'react';

import LoadingPage from "../../pages/LoadingPage";
import {Outlet, useLocation, Navigate} from 'react-router-dom'
import {AuthContext} from "../../context/AuthContext";

const PublicRouteLayout = ({ children }) => (
    <div className=''>
        {children}
    </div>
)

const PublicRoutes = () => {
    const location = useLocation();
    const { authUser, loading } = useContext(AuthContext);

    if (loading) {
        return <LoadingPage />;
    }

    return authUser
        ? <Navigate to="/home" state={{from:location}} replace />
        : (
            <PublicRouteLayout>
                <Outlet />
            </PublicRouteLayout>
        );
};

export default PublicRoutes;