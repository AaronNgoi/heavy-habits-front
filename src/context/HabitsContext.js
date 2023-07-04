import React, { createContext, useEffect, useState, useContext } from 'react';
import { db, auth } from '../firebase';
import { collection, doc, query, orderBy, updateDoc, onSnapshot } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


const HabitsContext = createContext();

export const HabitsProvider = ({ children }) => {
    const [habits, setHabits] = useState([]);
    const [habitsCount, setHabitsCount] = useState(0);
    const navigate = useNavigate();


    const handleUpdate = async (updatedHabit) => {
        const userId = auth.currentUser.uid;
        const habitRef = doc(db, 'users', userId, 'habits', updatedHabit.id);

        try {
            await updateDoc(habitRef, {
                habit_name: updatedHabit.habit_name,
                habit_subtext: updatedHabit.habit_subtext,
                repeat_option: updatedHabit.repeat_option,
                repeat_days: updatedHabit.repeat_days,
                repeat_times: updatedHabit.repeat_times,
            });
            navigate('/home');  // navigate back home only if the update was successful
        } catch (error) {
            console.error("Error updating habit to Firestore", error);
        }
    };

    const handleUpdateCompletedExpectedDates = async (updatedHabit) => {
        const userId = auth.currentUser.uid;
        const habitRef = doc(db, 'users', userId, 'habits', updatedHabit.id);

        try {
            await updateDoc(habitRef, {
                completed_dates: updatedHabit.completed_dates,
                expected_dates: updatedHabit.expected_dates,
            });
            navigate('/home');  // navigate back home only if the update was successful
        } catch (error) {
            console.error("Error updating habit to Firestore", error);
        }
    };


    useEffect(() => {
        const fetchHabits = () => {
            try {
                const userId = auth.currentUser.uid;
                const userRef = doc(db, 'users', userId);
                const habitsRef = collection(userRef, 'habits');
                const habitsQuery = query(habitsRef, orderBy("habit_created_date"));

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

    return (
        <HabitsContext.Provider value={{ habits, habitsCount, handleUpdate, handleUpdateCompletedExpectedDates }}>
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