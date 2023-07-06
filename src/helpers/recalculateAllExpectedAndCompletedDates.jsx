import { startOfWeek, endOfWeek, eachDayOfInterval, startOfDay, addDays, format, parse, eachWeekOfInterval, compareAsc } from 'date-fns';
import { getCurrentDateInUserTimezoneDateFormat } from '../utils/dateUtils';

const recalculateAllExpectedAndCompletedDates = (habit) => {
    const habitCreatedDate = parse(habit.habit_created_date, 'dd/MM/yyyy', new Date());
    const today = startOfDay(getCurrentDateInUserTimezoneDateFormat())

    const weekIntervals = eachWeekOfInterval(
        { start: habitCreatedDate, end: today },
        { weekStartsOn: 1 }
    );

    let newExpectedDates = {};
    let newCompletedDates = {};

    for (let weekStartDate  of weekIntervals) {
        const startOfWeekDate = startOfWeek(weekStartDate, { weekStartsOn: 1 });
        const endOfWeekDate = endOfWeek(weekStartDate, { weekStartsOn: 1 });
        const datesArray = eachDayOfInterval({ start: startOfWeekDate, end: endOfWeekDate });

        for (let date of datesArray) {
            const dateFormatted = format(date, 'dd/MM/yyyy');
            const dayOfWeek = format(date, 'eeee');
            let isExpected = false;
            let completedCount = 0;

            // Stop calculation for dates today and after
            if (compareAsc(date, today) != -1) {
                break;
            }


            // If date is before habit created date, skip to next date without calculations
            if (compareAsc(date, habitCreatedDate) === -1) {
                continue;
            }

            if (!habit.completed_dates[dateFormatted]) {
                habit.completed_dates[dateFormatted] = false;
            }

            if (habit.repeat_option === 'Ticked Days') {
                isExpected = habit.repeat_days.includes(dayOfWeek);
            } else if (habit.repeat_option === 'Weekly') {
                if (compareAsc(startOfWeekDate, habitCreatedDate) === -1) {
                    // Marking habits as not expected for half week with startOfWeekDate before habit_created_date
                    isExpected = false;
                } else {
                    const completed_dates = habit.completed_dates;
                    for (let loopDate = new Date(startOfWeekDate); compareAsc(loopDate, date) !== 1; loopDate = addDays(loopDate, 1)) {
                        const loopDateFormatted = format(loopDate, 'dd/MM/yyyy');
                        if (completed_dates[loopDateFormatted]) {
                            completedCount++;
                        }
                    }

                    const dayOfWeek1 = date.getDay();
                    const adjustedDayOfWeek = dayOfWeek1 === 0 ? 7 : dayOfWeek1;
                    const remainingDays = 7 - adjustedDayOfWeek;

                    isExpected = ((remainingDays - parseInt(habit.repeat_times)) + completedCount < 0) ||
                        (!!habit.completed_dates[dateFormatted] && completedCount <= parseInt(habit.repeat_times));
                }
            }

            newExpectedDates[dateFormatted] = isExpected;
        }
    }

    return {
        expected_dates: {
            ...habit.expected_dates,
            ...newExpectedDates,
        },
        completed_dates: {
            ...habit.completed_dates,
            ...newCompletedDates,
        },
    };
};

export default recalculateAllExpectedAndCompletedDates;