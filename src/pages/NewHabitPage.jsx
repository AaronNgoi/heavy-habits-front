import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import HabitForm from '../components/HabitForm';
import BackIcon from '../assets/back_icon.svg';
import PageWrapper from '../components/PageWrapper';
import { db, auth } from '../firebase';
import { collection, doc, addDoc } from "firebase/firestore";
import { getCurrentDateInUserTimezone } from '../utils/dateUtils';
import {useHabits} from "../context/HabitsContext";
import {toastError} from "../helpers/toastError";
import {toastSuccess} from "../helpers/toastSuccess";


const NewHabitPage = () => {
    const navigate = useNavigate();
    const { habits } = useHabits();

    const maxIndex = habits.reduce((max, habit) => {
        return (typeof habit.habit_index === 'number') ? Math.max(max, habit.habit_index) : max;
    }, -1);

    const newHabitIndex = maxIndex + 1


    const handleNewHabitSubmit = async (formData) => {
        const habitData = {
            habit_name: formData.habitName,
            habit_subtext: formData.habitSubtext,
            repeat_option: formData.repeatOption,
            repeat_days: formData.repeatOption === 'Ticked Days' ? formData.tickedDays : null,
            repeat_times: formData.repeatOption === 'Weekly' ? formData.timesPerWeek : null,
            habit_created_date: getCurrentDateInUserTimezone(),
            completed_dates: {},
            expected_dates: {},
            habit_index: newHabitIndex,
            last_updated: getCurrentDateInUserTimezone(),
        };


        try {
            const userId = auth.currentUser.uid;
            const userRef = doc(db, 'users', userId);
            const habitRef = collection(userRef, 'habits');
            await addDoc(habitRef, habitData);
            toastSuccess(`${habitData.habit_name} successfully added!`);
        } catch (error) {
            console.error("Error writing new habit to Firestore", error);
            toastError("Failed to add the habit. Please try again later.");
        }

        navigate('/home');
    };


    return (
        <div>
            <Header text="NEW HABIT" />
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
                        <HabitForm onSubmit={handleNewHabitSubmit} />
                    </div>
                }
            </PageWrapper>
        </div>
    );
};

export default NewHabitPage;
