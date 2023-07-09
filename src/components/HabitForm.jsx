import React, { useState, useEffect } from 'react';
import tick from "../assets/tickfat.svg";
import close from "../assets/close.svg";


function HabitForm({ initialValues, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        habitName: initialValues?.habit_name || '',
        repeatOption: initialValues?.repeat_option || 'Weekly',
        timesPerWeek: initialValues?.repeat_times || 1,
        tickedDays: initialValues?.repeat_days || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        habitSubtext: initialValues?.habit_subtext || '',
    });



    const daysOfWeek = [
        { label: 'M', value: 'Monday' },
        { label: 'T', value: 'Tuesday' },
        { label: 'W', value: 'Wednesday' },
        { label: 'T', value: 'Thursday' },
        { label: 'F', value: 'Friday' },
        { label: 'S', value: 'Saturday' },
        { label: 'S', value: 'Sunday' },
    ];

    const toggleDaySelection = (day) => {
        if (!formData.tickedDays.length) {
            setFormData({ ...formData, tickedDays: [day] });
        } else if (formData.tickedDays.includes(day)) {
            setFormData({ ...formData, tickedDays: formData.tickedDays.filter((d) => d !== day) });
        } else {
            setFormData({ ...formData, tickedDays: [...formData.tickedDays, day] });
        }
    };

    //
    const handleChange = (event) => {
        const { name, value } = event.target;
        let finalValue = name === "timesPerWeek" ? parseInt(value, 10) : value;
        setFormData({ ...formData, [name]: finalValue });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const { habitName, repeatOption, timesPerWeek, tickedDays, habitSubtext } = formData;

    const habitSuggestions = [
        "Workout 💪",
        "Read 📚",
        "Drink Water 💧",
        "Eat Healthy 🥗",
        "Meditate 🧘🏻‍♀️",
        "Call a friend 📲",
        "No Alcohol ️🙅‍♂️🍷"
    ];




    return (
        <form onSubmit={handleSubmit} className="standard-component p-8 text-lg flex flex-col gap-4 shadow-md drop-shadow-md pb-8">
            <div  className="flex items-center flex-col">
                <label className="w-full">
                    Habit Name:
                    <div className="relative input-wrapper flex-1 w-full">
                        <input type="text" name="habitName" value={habitName} onChange={handleChange} className="relative w-full text-base font-normal font-itim pl-4" required/>
                        {!onCancel && habitName &&
                            <img src={close} alt="Close Icon" className="habitNameClear h-6 w-6 absolute cursor-pointer" onClick={() => handleChange({ target: { name: 'habitName', value: '' } })} />
                        }
                    </div>
                </label>
                {!onCancel && habitName === "" &&
                    <div className="flex flex-wrap py-2">
                        {habitSuggestions.map((habitSuggestion, index) =>
                        <div className='px-1 mr-1 mt-1 font-itim text-sm border rounded-lg border-brown-border bg-orange-button hover:bg-orange-button-click cursor-pointer' key={index} onClick={() => { handleChange({ target: { name: 'habitName', value: habitSuggestion } });}}>
                            {habitSuggestion}
                        </div>
                        )}
                    </div>
                }
            </div>
            <div  className="flex items-center">
                <label className="mr-4">
                    Repeat:
                </label>
                <select name="repeatOption" value={repeatOption} onChange={handleChange} className="text-base font-itim font-normal">
                    <option value="Weekly">Weekly</option>
                    <option value="Ticked Days">Ticked Days</option>
                </select>
            </div>
            {repeatOption === 'Weekly' ? (
                <div className="flex items-center">
                    <label className="flex items-center">
                        Times a week:
                        <select name ="timesPerWeek" value={timesPerWeek} onChange={handleChange} className="text-base font-normal ml-4 font-itim">
                            {[1, 2, 3, 4, 5, 6].map((number) => (
                                <option key={number} value={number}>
                                    {number}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            ) : (
                <div className="grid grid-cols-7 gap-2">
                    {daysOfWeek.map((day) => (
                        <label key={day.value} className="flex flex-col items-center">                  <button
                            type="button"
                            aria-label="Tick button"
                            className={`form-day-btn ${tickedDays.includes(day.value) ? 'selected' : ''}`}
                            onClick={() => toggleDaySelection(day.value)}
                        >
                            {tickedDays.includes(day.value) ? <img src={tick} alt="Tick" className="w-8 h-8 pointer-events-none"/> : ''}
                        </button>
                            <span className="-mt-1">{day.label}</span>
                        </label>
                    ))}
                </div>
            )}
            <div className="flex flex-col">
                <label>
                    Why is this important?
                    <textarea name="habitSubtext" value={habitSubtext} onChange={handleChange} className="w-full text-base font-normal font-itim" />
                </label>
            </div>
            {onCancel ? (
                <div className="flex justify-between">
                    <button
                        className="flex items-center justify-center bg-green text-FCE3BF text-biege-form-colour py-2 px-4 rounded-3xl w-full  hover:bg-green-clicked hover:scale-105 hover:border-green hover:shadow-md transition-all duration-200 active:translate-y-1 active:scale-95"
                    >
                        SAVE
                    </button>
                    <button
                        className="flex items-center justify-center bg-red text-FCE3BF text-biege-form-colour py-2 px-4 rounded-3xl w-full ml-4 hover:bg-red-clicked hover:scale-105 hover:border-green hover:shadow-md transition-all duration-200 active:translate-y-1 active:scale-95"
                        type="button"
                        onClick={onCancel}
                    >
                        CANCEL
                    </button>
                </div>
            ) : (
                <button
                    className="flex items-center justify-center bg-green text-FCE3BF text-biege-form-colour py-2 px-4 rounded-3xl w-full hover:bg-green-clicked hover:scale-105 hover:border-green hover:shadow-md transition-all duration-200 active:translate-y-1 active:scale-95"
                >
                    SAVE
                </button>
            )}
        </form>
    );
};

export default HabitForm