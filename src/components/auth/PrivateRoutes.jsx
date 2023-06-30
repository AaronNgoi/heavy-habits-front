import React, { useContext } from 'react';
import {Outlet, useLocation, Navigate} from 'react-router-dom'
import {AuthContext} from "../../context/AuthContext";
import LoadingPage from "../../pages/LoadingPage";
import PetDisplay from "../PetDisplay";


const PrivateRouteLayout = ({children}) => (
    <>
        <div className="bg-brown-pet-bg relative h-44"> </div>
        <PetDisplay/>
        {children}
    </>
);

const PrivateRoutes = () => {
    const location = useLocation();
    const { authUser, loading } = useContext(AuthContext);

    if (loading) { // If loading, don't render anything yet
        return <LoadingPage/>;
    }

    return authUser
        ? (<PrivateRouteLayout><Outlet/></PrivateRouteLayout>)
        : (<Navigate to="/signin" state={{from:location}} replace />);


};

export default PrivateRoutes;