import React, { createContext, useState } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [soundEffects, setSoundEffects] = useState(
        localStorage.getItem('soundEffects') === 'true' || true
    );
    const [todaysHabitsOnly, setTodaysHabitsOnly] = useState(
        localStorage.getItem('todaysHabitsOnly') === 'true' || false
    );

    const updateSoundEffects = (value) => {
        setSoundEffects(value);
        localStorage.setItem('soundEffects', value);
    };

    const updateTodaysHabitsOnly = (value) => {
        setTodaysHabitsOnly(value);
        localStorage.setItem('todaysHabitsOnly', value);
    };

    return (
        <SettingsContext.Provider
            value={{
                soundEffects,
                setSoundEffects: updateSoundEffects,
                todaysHabitsOnly,
                setTodaysHabitsOnly: updateTodaysHabitsOnly
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};
