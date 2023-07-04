import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import BackIcon from '../assets/back_icon.svg';
import PageWrapper from '../components/PageWrapper';
import Settings from "../components/Settings";
// import { db, auth } from '../firebase';
// import { collection, doc, addDoc } from "firebase/firestore";
// import { getCurrentDateInUserTimezone } from '../utils/dateUtils';



const NewHabitPage = () => {
    const navigate = useNavigate();


    return (
        <div>
            <Header text="SETTINGS" />
            <PageWrapper>
                {
                    <div className="px-6">
                        <div className="pt-3 pb-6 flex">
                            <Link to="/home" className=''>
                                <button className="flex items-center justify-center text-lg bg-brown-add-button text-FCE3BF py-2 px-4 border-brown-font border-2 rounded-22px active:bg-brown-button-press active:scale-95 hover:bg-brown-button-press">

                                    <img src= {BackIcon} alt="Back" className="h-5 w-5 inline-block"/>
                                    <span className="ml-2">Back</span>

                                </button>
                            </Link>
                        </div>
                        <Settings/>
                    </div>
                }
            </PageWrapper>
        </div>
    );
};

export default NewHabitPage;
