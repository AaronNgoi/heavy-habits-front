import { compareAsc, parse, format } from 'date-fns';

export const getHabitMonthDisplay = (habit, dates) =>  {
  const habitCreatedDate = parse(habit.habit_created_date, 'dd/MM/yyyy', new Date());
  const today = new Date();
  return dates.map(date => {
    const parsedDate = parse(date, 'dd/MM/yyyy', new Date());
    let expected_date = false;
    let completed_date = false;
    let day = format(parsedDate, 'EEEEE');
    // Check if date is after habit creation date and not in the future
    if (compareAsc(parsedDate, habitCreatedDate) !== -1 && compareAsc(today, parsedDate) !== -1) {
      expected_date = habit.expected_dates[date] || false;
      completed_date = habit.completed_dates[date] || false;
    }

    return {
      date,
      day,
      expected_date,
      completed_date
    };
  });
}