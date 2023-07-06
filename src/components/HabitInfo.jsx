import React, { useState, useContext } from 'react';
import { db, auth } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';  // new import statements


import { getCurrentDateInUserTimezone } from '../utils/dateUtils';
import summonConfetti from '../utils/summonConfetti';
import tick from '../assets/tickfat.svg';


import HabitInfoNameSubtext from "./HabitInfoNameSubtext";
import HabitInfoMoreOptions from "./HabitInfoMoreOptions";
import ExpandedHabitInfo from "./ExpandedHabitInfo";
import {SettingsContext} from "../context/SettingsContext";
import sucessSound from '../assets/success_sound.mp3';


const HabitInfo = ({ habit, expanded }) => {
    const today = getCurrentDateInUserTimezone()
    const isCompleted = habit.completed_dates?.[today] === true;
    const {soundEffects} = useContext(SettingsContext);
    const successSound = new Audio(sucessSound);

    const handleComplete = async (habit) => {
        const completed_dates = habit.completed_dates || {};

        const button = document.getElementById(`button-${habit.id}`);

        const userId = auth.currentUser.uid;


        if (!completed_dates[today]) {
            // Start loading state
            button.disabled = true;
            button.classList.add('loading');

            setTimeout(async () => {
                summonConfetti(habit.id);

                if (soundEffects) {
                    try {
                        // const successSound = new Audio(sucessSound);
                        successSound.play().catch(() => {
                        });
                    } catch (error) {
                    }
                }

                // End loading state
                button.disabled = false;
                button.classList.remove('loading');

                // Mark the habit as completed
                completed_dates[today] = true;

                // Get reference to the document
                const habitRef = doc(db, 'users', userId, 'habits', habit.id);

                // Update the habit document in firestore
                try {
                    await updateDoc(habitRef, {
                        completed_dates: completed_dates
                    });
                    console.log("Document successfully updated!");
                } catch (error) {
                    console.error("Error updating document: ", error);
                }

            }, 920);

        } else {
            delete completed_dates[today];

            // Get reference to the document
            const habitRef = doc(db, 'users', userId, 'habits', habit.id);

            // Update the habit document in firestore
            try {
                await updateDoc(habitRef, {
                    completed_dates: completed_dates
                });
                console.log("Document successfully updated!");
            } catch (error) {
                console.error("Error updating document: ", error);
            }
        }
    };


    return (
        <div className={`standard-component relative flex flex-col items-stretch py-2 px-2 ${(isCompleted && !expanded) ? 'completed-bg' : ''}`}>
            <div className="flex items-center justify-between ">
                <div className="flex items-center space-x-3 whitespace-nowrap overflow-hidden overflow-ellipsis">
                    <div className="-mr-1 flex-shrink-0">
                        <HabitInfoMoreOptions
                            habit={habit}
                        />
                    </div>
                    <HabitInfoNameSubtext isCompleted={isCompleted} habit={habit}/>
                </div>
                <div className="flex">
                    <button id={`button-${habit.id}`}
                            className={` flex justify-center complete-today-btn rounded-19px m-1 ${
                                habit.completed_dates?.[today] === true
                                    ? 'completed'
                                    : ''
                            }`}
                            onClick={() => {
                                handleComplete(habit);
                            }}
                    >
                        {habit.completed_dates?.[today] === true ? <img src={tick} alt="Tick" className="w-6 h-6"/> : '✓'}
                        <div className="absolute message loadingMessage h-10 w-10">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" className="h-10 w-10">
                                <circle className="loadingCircle" cx="11" cy="28" r="2"/>
                                <circle className="loadingCircle" cx="20" cy="28" r="2"/>
                                <circle className="loadingCircle" cx="29" cy="28" r="2"/>
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
            {expanded && <ExpandedHabitInfo habit = {habit} />}
        </div>
    );
};

export default HabitInfo;