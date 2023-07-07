import HomeIcon from "../assets/home_icon.svg";
import ReportIcon from "../assets/report_icon.svg";
import SettingsIcon from "../assets/settings_icon.svg";

import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
    const location = useLocation();

    const getStyle = (paths) => {
        return paths.includes(location.pathname)
            ? "bg-brown-button-press"
            : "";
    }

    return (
        <nav className="rounded-t-36px fixed inset-x-0 bottom-0 z-20 pb-[calc(max(env(safe-area-inset-bottom),16px)-16px)] bg-brown-nav-bar flex justify-around select-none text-FCE3BF border-t-2 border-brown-component ">
            <Link to="/reportweek" className={`${getStyle(["/reportweek", "/reportmonth"])} flex flex-col items-center py-2 my-1 px-10 rounded-3xl transition-all duration-400 ease-in-out hover:scale-105 active:scale-110`}>
                <img src={ReportIcon} alt="Shrink Icon" className="h-9 w-9 inline-block"/>
            </Link>
            <Link to="/home" className={`${getStyle(["/home"])} flex flex-col items-center py-2 my-1 px-10 rounded-3xl transition-all duration-400 ease-in-out hover:scale-105 active:scale-110`}>
                <img src={HomeIcon} alt="Shrink Icon" className="h-9 w-9 inline-block"/>
            </Link>
            <Link to="/settings" className={`${getStyle(["/settings", "/reorderhabits"])} flex flex-col items-center py-2 my-1 px-10 rounded-3xl transition-all duration-400 ease-in-out hover:scale-105 active:scale-110`}>
                <img src={SettingsIcon} alt="Shrink Icon" className="h-9 w-9 inline-block"/>
            </Link>
        </nav>
    );
};

export default BottomNav;
