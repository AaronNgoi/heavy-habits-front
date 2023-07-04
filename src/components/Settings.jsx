import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import {useHabits} from "../context/HabitsContext";
import '../styles/button.css';


const Settings = () => {
    const { habitsCount } = useHabits()
    const currentUser = auth.currentUser;
    const initial = currentUser?.email.charAt(0).toUpperCase();

    return (
        <div className="standard-component p-8 text-lg flex flex-col gap-4 shadow-md drop-shadow-md pb-8">
            <div className='flex flex-row items-center'>

                <div className='mr-4 flex-shrink-0 w-14 h-14 flex align-center bg-biege-background items-center justify-center text-2xl rounded-full'>
                    {initial}
                </div>

            <div className='flex flex-col whitespace-nowrap overflow-clip overflow-ellipsis'>
            <div className="flex items-center justify-between ">
                <p className='whitespace-nowrap overflow-clip overflow-ellipsis text-lg'>{currentUser?.email}</p>
            </div>

            <div className='text-brown-add-button font-itim text-lg'>
                {habitsCount === 0 ? "No Habits yet" :
                    habitsCount === 1 ? "1 Habit" : `${habitsCount} Habits`}
            </div>
            </div>

            </div>

            <hr className="my-4 border-brown-add-button" />

            <div>
                <Link to="/reorderhabits">
                    <button className="flex items-center text-lg justify-center bg-orange-button text-brown-font py-1 px-3 rounded-2xl border-brown-component rounded-22px border-2 active:bg-orange-button-click transition-all duration-100 hover:bg-orange-button-click">Re-Order Habits</button>
                </Link>


                <div className="flex items-center w-full mt-4">
                    <label className='flex justify-between w-full items-center'>
                        <span>Sound Effects</span>


                        <div className="toggle-button-cover ">
                            <div className="button-cover">
                                <div className="button r" id="button-3">
                                    <input type="checkbox" className="checkbox"/>
                                    <div className="knobs"></div>
                                    <div className="layer"></div>
                                </div>
                            </div>
                        </div>


                    </label>
                </div>


                <div className="flex items-center w-full mt-3">
                    <label className='flex justify-between w-full items-center'>
                        Today's Habits Only

                        <div className="toggle-button-cover ">
                            <div className="button-cover">
                                <div className="button r" id="button-3">
                                    <input type="checkbox" className="checkbox"/>
                                    <div className="knobs"></div>
                                    <div className="layer"></div>
                                </div>
                            </div>
                        </div>


                    </label>
                </div>
            </div>

            <div className="flex justify-end mt-8 text-xl">
                <button className="mr-5 hover:scale-105 transition-200">Logout</button>
                <button className="ml-5 mr-1 hover:scale-105 transition-200">Delete</button>
            </div>







        </div>
    );
}

export default Settings;