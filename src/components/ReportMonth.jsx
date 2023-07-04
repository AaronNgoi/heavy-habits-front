import React, { useState } from 'react';
import WeekIcon from '../assets/week_icon_orange.svg';
import { Link } from 'react-router-dom';
import { useHabits } from '../context/HabitsContext';
import navigateLeft from '../assets/navigate_left.svg';
import navigateRight from '../assets/navigate_right.svg';
import { startOfMonth, eachDayOfInterval, endOfWeek, endOfMonth, addMonths, addDays, subMonths, format, getDay, getWeeksInMonth, min } from 'date-fns';
import { getHabitWeekDisplay } from '../helpers/getHabitWeekDisplay';
import sumIcon from '../assets/sum_icon.svg';
import consistencyIcon from '../assets/consistency_icon.svg';
import { useSwipeable } from 'react-swipeable';


function ReportMonth() {
    const [displayedMonthStart, setDisplayedMonthStart] = useState(startOfMonth(new Date()));
    const [displayedMonthEnd, setDisplayedMonthEnd] = useState(endOfMonth(new Date()));
    const { habits } = useHabits();

    console.log("displayedMonthStart", displayedMonthStart);
    console.log("displayedMonthEnd", displayedMonthEnd);

    function nextMonth() {
        setDisplayedMonthStart(prevDate => {
            const nextMonthDate = addMonths(prevDate, 1);
            setDisplayedMonthEnd(endOfMonth(nextMonthDate));
            return nextMonthDate;
        });
    }

    function previousMonth() {
        setDisplayedMonthStart(prevDate => {
            const previousMonthDate = subMonths(prevDate, 1);
            setDisplayedMonthEnd(endOfMonth(previousMonthDate));
            return previousMonthDate;
        });
    }

    function generateMonthDates(start, end) {
        const dateArray = eachDayOfInterval({ start, end });
        return dateArray.map(date => format(date, 'dd/MM/yyyy'));
    }

    const monthDates = generateMonthDates(displayedMonthStart, displayedMonthEnd);

    console.log("monthDates",monthDates)

    function getMonthWeeks(date) {
        return getWeeksInMonth(date);
    }

    const CircleDateDisplay = ({ date, expected_date, completed_date }) => {
        let bgColor;

        if (completed_date) {
            bgColor = 'bg-green';
        } else if (expected_date && !completed_date) {
            bgColor = 'bg-red';
        } else {
            bgColor = 'bg-biege-display';
        }

        return (
            <div
                className={`h-4 w-4 rounded-full flex items-center justify-center ${bgColor}`}
            />
        );
    };



    function WeekDisplay({ habit, weekDates }) {
        const weekDisplay = getHabitWeekDisplay(habit, weekDates);

        return (
            <div className="flex">
                {weekDisplay.map((day, index) => (
                    <div key={index} className="day">
                        {day.expected_date && <span className="expected"></span>}
                        {day.completed_date && <span className="completed"></span>}
                    </div>
                ))}
            </div>
        );
    }

    const monthWeeks = getMonthWeeks(displayedMonthStart);
    console.log("monthWeeks",monthWeeks)
    const firstDayOfMonth = getDay(displayedMonthStart);
    console.log("firstDayOfMonth",firstDayOfMonth)
    const lastDayOfMonth = getDay(displayedMonthEnd);
    console.log("lastDayOfMonth",lastDayOfMonth)

    const monthDateArray = [];

    let weekStart = displayedMonthStart;
    for (let i = 0; i < monthWeeks; i++) {
        let weekEnd = endOfWeek(weekStart);
        weekEnd = min([weekEnd, displayedMonthEnd]); // Ensure the week doesn't go into the next month
        monthDateArray.push(generateMonthDates(weekStart, weekEnd));
        weekStart = addDays(weekEnd, 1);  // The start of the next week is the day after the end of this week
    }
    console.log("monthDateArray",monthDateArray);

    const getHabitMonthDisplay = (habit, monthDateArray) => {
        let totalExpectedDates = 0;
        let totalCompletedDates = 0;

        const monthDisplay = monthDateArray.map(week => {
            const weekDisplay = getHabitWeekDisplay(habit, week);
            // count the expected and completed dates in each week
            weekDisplay.forEach(day => {
                if (day.expected_date) totalExpectedDates++;
                if (day.completed_date) totalCompletedDates++;
            });
            return weekDisplay;
        });

        return {
            monthDisplay,
            totalExpectedDates,
            totalCompletedDates
        };
    };

    const handlers = useSwipeable({
        delta: 50,
        onSwipedLeft: () => previousMonth(),
        onSwipedRight: () => nextMonth(),

        onTap: ({ event }) => {
            // Check if the tap is near the edge of the screen
            const { clientX } = event.touches[0] || event.changedTouches[0];
            const screenWidth = window.innerWidth;
            const edgeThreshold = 30; // Adjust the threshold as needed

            if (clientX <= edgeThreshold) {
                previousMonth();
            } else if (clientX >= screenWidth - edgeThreshold) {
                nextMonth();
            }
        },
    });

    function displayHabitMonth(habit, monthDateArray) {
        const { monthDisplay, totalExpectedDates, totalCompletedDates } = getHabitMonthDisplay(habit, monthDateArray);

        const percentage = totalExpectedDates > 0
            ? Math.round((totalCompletedDates / totalExpectedDates) * 100)
            : 0;

        return (
            <>

                {monthDisplay.map((week, i) => {
                    let alignmentClass = "";
                    if (i === 0) {
                        alignmentClass = "justify-end"; // right align the first row
                    } else if (i === monthDisplay.length - 1) {
                        alignmentClass = "justify-start"; // left align the last row
                    } else {
                        alignmentClass = "justify-center"; // center the rest
                    }

                    return (
                        <div key={i} className={`week-row flex flex-row space-x-1 ${alignmentClass}`}>
                            {week.map(dayData => (
                                <CircleDateDisplay
                                    key={dayData.date}
                                    date={dayData.date}
                                    expected_date={dayData.expected_date}
                                    completed_date={dayData.completed_date}
                                />
                            ))}
                        </div>
                    );
                })}

                <div className="habit-stats flex flex-row space-x-2 mt-2 items-center justify-center">
                    <div className=" text-sm flex flex-row items-center align-center space-x-1">
                        <img src= {sumIcon} alt="sumIcon" className="flex ml-3 h-3 w-3 "/>
                        <div> {totalCompletedDates} <span className="-ml-1"> d</span></div>
                    </div>

                    <div className=" text-sm flex flex-row items-center align-center space-x-1">
                        <img src= {consistencyIcon} alt="consistencyIcon" className="flex ml-3 h-3 w-3 "/>
                        <div>{percentage}%</div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="px-6">
                <div className= "flex flex-row justify-center items-center">
                    <div className= "flex flex-row items-center ">
                        <button onClick={previousMonth}><img src= {navigateLeft} alt="navigateLeft" className="-top-16 absolute z-40 transform -translate-x-36 h-44 hover:scale-105"/></button>
                        <button onClick={nextMonth}><img src= {navigateRight} alt="navigateRight" className="-top-16 ml-106px absolute z-40 flex h-44 hover:scale-105"/></button>
                    </div>
                </div>
                <div className="pt-2 pb-2 flex justify-between items-center">

                    <button className="flex items-center justify-center text-lg bg-brown-add-button text-FCE3BF  py-2 px-4 border-brown-font border-2 rounded-22px shadow-press-brown-button active:bg-brown-button-press active:translate-y-2px active:shadow-none transition-all duration-100 hover:bg-brown-button-presss">
                        <Link to="/reportweek" className="flex flex-row items-center align-center ">
                            <span className="ml-1 flex">Week</span>
                            <img src= {WeekIcon} alt="Back" className="flex ml-3 h-6 w-6 "/>
                        </Link>
                    </button>

                    <div className=" text-right">
                        <div className="text-2xl tracking-normal">
                            {format(displayedMonthStart, 'yyyy')}
                        </div>
                        <div className='text-lg font-itim tracking-normal -mt-1'>
                            {format(displayedMonthStart, 'MMMM')}
                        </div>
                    </div>
                </div>
            </div>

            <div {...handlers}>
                <div className="px-4 flex flex-wrap justify-evenly">
                    {habits.map(habit => (
                        <div key={habit.habit_name} className="standard-component mt-3 px-1 mx-2 space-y-2 py-2 flex flex-col items-center font-jua justify-center flex-grow max-w-176px">
                            <p className=" whitespace-nowrap overflow-hidden overflow-ellipsis max-w-136px">{habit.habit_name}</p>
                            <div className="month-display flex flex-col space-y-1">
                                {displayHabitMonth(habit, monthDateArray)}
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
}

export default ReportMonth;