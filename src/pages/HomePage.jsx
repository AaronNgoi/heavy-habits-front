import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom';
// import ShrunkHabitTracker from '../ShrunkHabitTracker';
import { useHabits } from '../context/HabitsContext';
import Header from "../components/Header";
import { db, auth } from '../firebase';
import { collection, getDocs } from "firebase/firestore";


import PageWrapper from '../components/PageWrapper';
import AddHabitIcon from '../assets/add_habit_icon.svg';
import ShrinkIcon from '../assets/shrink.svg';
import ExpandIcon from '../assets/expand.svg';
import HabitInfo from "../components/HabitInfo";
import {SettingsContext} from "../context/SettingsContext";
import {getCurrentDateInUserTimezoneDateFormat} from "../utils/dateUtils";
import {eachDayOfInterval, endOfWeek, format, startOfWeek} from "date-fns";
import recalculateAllExpectedAndCompletedDates from "../helpers/recalculateAllExpectedAndCompletedDates";




const HomePage = () => {
    const [expanded, setExpanded] = useState(false);
    const { habits, habitsCount } = useHabits()
    const { todaysHabitsOnly } = useContext(SettingsContext);





    const filteredHabits = habits.filter((habit) => {

        if (!todaysHabitsOnly) {
            return true;
        }

        const todayDate = getCurrentDateInUserTimezoneDateFormat();
        const todayDay = format(todayDate, 'eeee')
        const startOfThisWeek = startOfWeek(todayDate, { weekStartsOn: 1 });
        const endOfThisWeek = endOfWeek(todayDate, { weekStartsOn: 1 });
        const ThisWeeksDates = eachDayOfInterval({ start: startOfThisWeek, end: endOfThisWeek });
        let FormattedDatesArray = []

        for (let date of ThisWeeksDates) {
            const dateFormatted = format(date, 'dd/MM/yyyy');
            FormattedDatesArray.push(dateFormatted );
        }

            if (habit.repeat_days && habit.repeat_days.includes(todayDay)) {
            return true; // Show habit if today is in repeat_days
        }

        if (habit.repeat_times && habit.completed_dates) {
            const repeatLimit = habit.repeat_times;
            const completedCount = FormattedDatesArray.filter((date) => habit.completed_dates[date]).length;
            if (completedCount < repeatLimit) {
                return true; // Show habit if completed count is less than repeat_times
            }
        }

        return false;
    });


    const toggleExpanded = () => {
        setExpanded(!expanded);
    };


    return (
        <div className="">
        <Header text="TRACKER - TODAY" />
<PageWrapper>



    {
        <div className= "px-6">
            <div className= "pt-3 pb-6">
                <div className= "flex justify-between">

                    <Link to="/habit/new" className='items-center align-middle'>
                    <button className="flex items-center justify-center text-lg bg-brown-add-button text-FCE3BF py-2 px-4 rounded-22px border-brown-font border-2  shadow-press-brown-button active:bg-brown-button-press active:translate-y-2px active:shadow-none transition-all duration-100 hover:bg-brown-button-press">
            <span className="mr-2 align-middle">
{habitsCount === 0 ? "Add Habits" :
    habitsCount === 1 ? "1 Habit" : `${habitsCount} Habits`}
</span>
                            <img src= {AddHabitIcon} alt="Add Habit" className="h-5 w-5 inline-block"/>
                    </button>
                    </Link>

                    {habitsCount > 0 && (
                        <button onClick={toggleExpanded} className="flex items-center text-lg justify-center bg-orange-button text-brown-font py-2 px-4 rounded-22px border-brown-component rounded-22px border-2 shadow-press-orange-button active:bg-orange-button-click active:translate-y-2px active:shadow-none transition-all duration-100 hover:bg-orange-button-click">
                            {expanded ? (
                                <>
                                    <img src={ShrinkIcon} alt="Shrink Icon" className="h-5 w-5 inline-block"/>
                                    <span className="ml-3 mr-1">Shrink</span>
                                </>
                            ) : (
                                <>
                                    <img src={ExpandIcon} alt="Expand Icon" className="h-5 w-5 inline-block"/>
                                    <span className="ml-2">Expand</span>
                                </>
                            )}
                        </button>
                    )}

                </div>
            </div>
            <div className="space-y-3">

                {habits.length === 0 && (<p className='mt-12 text-3xl text-center'>No habits added yet, please add new habits </p>)}


                {filteredHabits.map((habit) => (
                    <HabitInfo
                        key={habit.id}
                        habit={habit}
                        expanded={expanded}
                    />
                ))}
            </div>
        </div>
    }




</PageWrapper>
        </div>
    );
};

export default HomePage;