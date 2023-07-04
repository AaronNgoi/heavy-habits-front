import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import HabitForm from '../components/HabitForm';
import { useHabits } from '../context/HabitsContext';
import BackIcon from '../assets/back_icon.svg';
import recalculateAllExpectedAndCompletedDates from '../helpers/recalculateAllExpectedAndCompletedDates';
import PageWrapper from '../components/PageWrapper';

const EditHabitPage = () => {
    const { habits, handleCombinedUpdate } = useHabits();
    const { id } = useParams();

    const habitToEdit = habits.find((habit) => habit.id === id);
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/home');
    };

    const handleUpdateHabit = (formData) => {
        let updatedTimesPerWeek = formData.timesPerWeek;
        if (formData.repeat_option === 'Weekly' && !updatedTimesPerWeek.length) {
            updatedTimesPerWeek = "1";
        }

        let updatedHabitData = {
            ...habitToEdit,
            habit_name: formData.habitName,
            habit_subtext: formData.habitSubtext,
            repeat_option: formData.repeatOption,
            repeat_days: formData.repeatOption === 'Ticked Days' ? formData.tickedDays : null,
            repeat_times: formData.repeatOption === 'Weekly' ? updatedTimesPerWeek : null,
        };

        const relevantProperties = ['repeat_option', 'repeat_days', 'repeat_times'];
        const hasChanged = relevantProperties.some(prop => habitToEdit[prop] !== updatedHabitData[prop]);

        if (hasChanged) {
            const recalculatedData = recalculateAllExpectedAndCompletedDates(updatedHabitData);
            updatedHabitData = {
                ...updatedHabitData,
                expected_dates: recalculatedData.expected_dates,
                completed_dates: recalculatedData.completed_dates
            };
        }

        // Call the combined update function
        handleCombinedUpdate(updatedHabitData);
    };


    return (
        <div>
            <Header text="EDIT HABIT" />
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
                        {habitToEdit && (
                            <HabitForm
                                initialValues={{
                                    habit_name: habitToEdit.habit_name,
                                    repeat_option: habitToEdit.repeat_option,
                                    repeat_times: habitToEdit.repeat_times,
                                    repeat_days: habitToEdit.repeat_days,
                                    habit_subtext: habitToEdit.habit_subtext,
                                }}
                                onSubmit={handleUpdateHabit}
                                onCancel={handleCancel}
                            />
                        )}
                    </div>
                }
            </PageWrapper>
        </div>
    );
};

export default EditHabitPage;