import React, { createContext, useEffect, useState, useContext } from 'react';
import { db, auth } from '../firebase';
import { collection, doc, query, orderBy, updateDoc, onSnapshot } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import {getCurrentDateInUserTimezone} from "../utils/dateUtils";
import recalculateAllExpectedAndCompletedDates from "../helpers/recalculateAllExpectedAndCompletedDates";
import { toastSuccess } from '../helpers/toastSuccess';
import { toastError } from '../helpers/toastError';

const HabitsContext = createContext();

export const HabitsProvider = ({ children }) => {
    const [habits, setHabits] = useState([]);
    const [habitsCount, setHabitsCount] = useState(0);
    const navigate = useNavigate();
    const todayDateString =  getCurrentDateInUserTimezone()


    const handleUpdateCompletedExpectedDates = async (updatedHabit) => {
        const userId = auth.currentUser.uid;
        const habitRef = doc(db, 'users', userId, 'habits', updatedHabit.id);

        try {
            await updateDoc(habitRef, {
                completed_dates: updatedHabit.completed_dates,
                expected_dates: updatedHabit.expected_dates,
                last_updated: todayDateString,
            });
            navigate('/home');
        } catch (error) {
            console.error("Error updating habit to Firestore", error);
        }
    };

    const handleCombinedUpdate = async (updatedHabit) => {
        const userId = auth.currentUser.uid;
        const habitRef = doc(db, 'users', userId, 'habits', updatedHabit.id);

        try {
            await updateDoc(habitRef, {
                habit_name: updatedHabit.habit_name,
                habit_subtext: updatedHabit.habit_subtext,
                repeat_option: updatedHabit.repeat_option,
                repeat_days: updatedHabit.repeat_days,
                repeat_times: updatedHabit.repeat_times,
                completed_dates: updatedHabit.completed_dates,
                expected_dates: updatedHabit.expected_dates,
            });
            toastSuccess(`${updatedHabit.habit_name} has been successfully updated!`);
            navigate('/home');
        } catch (error) {
            console.error("Error updating habit to Firestore", error);
            toastError("Failed to update the habit. Please try again later.");

        }
    };


    useEffect(() => {
        const fetchHabits = () => {
            try {
                const userId = auth.currentUser.uid;
                const userRef = doc(db, 'users', userId);
                const habitsRef = collection(userRef, 'habits');
                const habitsQuery = query(habitsRef, orderBy("habit_index"));

                const unsubscribe = onSnapshot(habitsQuery, (habitsSnapshot) => {
                    const habitsData = habitsSnapshot.docs.map(doc => ({
                        ...doc.data(),
                        id: doc.id
                    }));

                    setHabits(habitsData);
                    setHabitsCount(habitsData.length);
                });

                return unsubscribe;

            } catch (error) {
                console.error("Error fetching habits from Firestore", error);
            }
        };

        return fetchHabits();
    }, []);




    useEffect(() => {
        const updateHabits = async () => {
            const updatePromises = habits.map(habit => {
                if (habit.last_updated !== todayDateString) {
                    const updatedExpectedAndCompletedDates = recalculateAllExpectedAndCompletedDates(habit)
                    const updatedHabitData = {
                        ...habit,
                        expected_dates: updatedExpectedAndCompletedDates.expected_dates,
                        completed_dates: updatedExpectedAndCompletedDates.completed_dates
                    }

                    return handleUpdateCompletedExpectedDates(updatedHabitData);
                }
                return Promise.resolve();
            });

            try {
                await Promise.all(updatePromises);
            } catch (error) {
                console.error("Error updating habits", error);
            }
        };

        updateHabits().catch(error => console.error("Error in updateHabits", error));
    }, [habits, todayDateString, handleUpdateCompletedExpectedDates]);



    return (
        <HabitsContext.Provider value={{ habits, habitsCount, handleUpdateCompletedExpectedDates, handleCombinedUpdate }}>
            {children}
        </HabitsContext.Provider>
    );
};

// Hook to use Context
export const useHabits = () => {
    const context = useContext(HabitsContext);

    if (!context) {
        throw new Error("useHabits must be used within a HabitsProvider");
    }

    return context;
};