import React, { useState, useContext } from 'react';
import {Outlet, useLocation, Navigate} from 'react-router-dom'
import {AuthContext} from "../../context/AuthContext";
import LoadingPage from "../../pages/LoadingPage";
import PetDisplay from "../PetDisplay";
import {HabitsProvider} from "../../context/HabitsContext";
import HabitInfoMoreOptionsContext from "../../context/HabitInfoMoreOptionsContext";
import BottomNav from "../BottomNav";
import {SettingsProvider} from "../../context/SettingsContext";


const PrivateRouteLayout = ({children}) => (
    <div className='bg-biege-background h-full min-h-screen'>
        <div className="bg-brown-pet-bg relative h-44"> </div>
        <PetDisplay/>
        {children}
        <BottomNav/>
    </div>
);

const PrivateRoutes = () => {
    const location = useLocation();
    const { authUser, loading } = useContext(AuthContext);
    const [openedHabitMoreOptions, setOpenedHabitMoreOptions] = useState(null);

    if (loading) { // If loading, don't render anything yet
        return <LoadingPage/>;
    }

    return authUser
        ? (
            <HabitsProvider>
                <SettingsProvider>
                <HabitInfoMoreOptionsContext.Provider value={{ openedHabitMoreOptions, setOpenedHabitMoreOptions }}>
                    <canvas id="canvas" style={{position: 'fixed', top: '0px', left: '0px', pointerEvents: 'none', zIndex: 100, height: '100vh', width: '100%'}}></canvas>
                    <PrivateRouteLayout><Outlet/></PrivateRouteLayout>
                </HabitInfoMoreOptionsContext.Provider>
                </SettingsProvider>
            </HabitsProvider>
        )
        : (<Navigate to="/signin" state={{from:location}} replace />);


};

export default PrivateRoutes;