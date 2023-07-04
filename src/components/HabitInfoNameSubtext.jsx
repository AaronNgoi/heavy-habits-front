import React from 'react';

const HabitInfoNameSubtext = ({isCompleted, habit}) => {

return (
    <div className="habit-header whitespace-nowrap overflow-clip overflow-ellipsis">
        <h2 className={`text-xl ${isCompleted ? 'line-through' : ''} whitespace-nowrap overflow-clip overflow-ellipsis`}>{habit.habit_name}</h2>
        {habit.habit_subtext && <p className="-mt-1 whitespace-nowrap overflow-clip overflow-ellipsis font-itim tracking-wide">{habit.habit_subtext}</p>}
    </div>
);
};

export default HabitInfoNameSubtext;