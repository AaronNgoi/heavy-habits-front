import React, { useState } from 'react';
import { useHabits } from '../context/HabitsContext';
import AddHistoricalRecordIcon from '../assets/add_historical_record.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { getCurrentDateInUserTimezoneDateFormat } from '../utils/dateUtils';
import recalculateHistoricalWeeklyExpectedDates from '../helpers/recalculateHistoricalWeeklyExpectedDates';
import {addDays, format, parse} from 'date-fns';
import { toastSuccess } from '../helpers/toastSuccess';
import { toastError } from '../helpers/toastError';

const AddHistoricalRecord = ({ habitId }) => {
    const { habits, handleUpdateCompletedExpectedDates } = useHabits();
    const yesterday = addDays(getCurrentDateInUserTimezoneDateFormat(), -1);
    const [selectedDate, setSelectedDate] = useState(yesterday);
    const navigate = useNavigate();
    const habit = habits.find((h) => h.id === habitId);

    if (!habit) {
        return <div className='text-3xl mx-auto py-6 text-center'>Habit not found</div>;
    }

    const habitCreatedDate = parse(habit.habit_created_date, 'dd/MM/yyyy', new Date());
    const displaySelectedDate = format(new Date(selectedDate), 'do \'of\' MMM, yyyy')
    const displayHabitCreatedDate = format(new Date(habitCreatedDate), 'do \'of\' MMM, yyyy')



    const handleDateChange = (date) => {
        setSelectedDate(date);
    };


    const handleSubmit = () => {
        const formattedDate = format(new Date(selectedDate), 'dd/MM/yyyy');
        // Check if the date is not already completed
        if (!habit.completed_dates || habit.completed_dates[formattedDate] !== true) {
            const updatedHabit = {
                ...habit,
                completed_dates: {
                    ...(habit.completed_dates || {}),
                    [formattedDate]: true,
                },
            };

            // Recalculate the expected dates for the updated habit
            const updatedExpectedDates = recalculateHistoricalWeeklyExpectedDates(updatedHabit, selectedDate);
            updatedHabit.expected_dates = updatedExpectedDates.expected_dates;

            handleUpdateCompletedExpectedDates(updatedHabit);
            toastSuccess(`${habit.habit_name} has been marked as completed on ${displaySelectedDate}`);
        } else {
            toastError(`${displaySelectedDate} was already marked as completed for ${habit.habit_name}`);
        }
        navigate('/home');
    };



    return (
        <div className="standard-component p-8 text-lg flex flex-col gap-4 shadow-md drop-shadow-md  pb-8">
            <div className="standard-page flex items-center">
                <img src={AddHistoricalRecordIcon} alt="Add Record" />
                <p className="ml-4">Add Historical Record</p>
            </div>
            <p className='font-itim'> You're marking <span className='font-semibold'>{habit.habit_name}</span> as completed on the <span className='font-semibold'>{displaySelectedDate}</span>. <br className='mt-2'/> Please note that records can only be added for dates following this habits creation: <span className='font-semibold'>{displayHabitCreatedDate}</span> .</p>
            <p className='-mb-2'> When?</p>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                minDate={habitCreatedDate}
                maxDate={yesterday}
                filterDate={(date) => date >= habitCreatedDate && date <= yesterday}
                className="w-full"
            />
            <div className="flex justify-between">
                <button onClick={handleSubmit} className="flex items-center justify-center bg-green text-FCE3BF text-biege-form-colour py-2 px-4 rounded-3xl w-full">Save</button>
                <button onClick={() => navigate('/home')} className="flex items-center justify-center bg-red text-FCE3BF text-biege-form-colour py-2 px-4 rounded-3xl w-full ml-4">Cancel</button>
            </div>
        </div>
    );
};

export default AddHistoricalRecord;