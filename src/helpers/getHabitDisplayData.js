import { addDays, isBefore, format, parse } from 'date-fns';

export const getHabitDisplayData = (habit, startDate) => {
  const habitCreatedDate = parse(habit.habit_created_date, 'dd/MM/yyyy', new Date());
  const output = [];

  for (let i = 0; i < 91; i++) {
    const currentDate = addDays(startDate, i);
    let completed_date = false;
    let expected_date = false;

    if (!isBefore(currentDate, habitCreatedDate)) {
      const formattedDate = format(currentDate, 'dd/MM/yyyy');
      completed_date = habit.completed_dates[formattedDate] || false;
      expected_date = habit.expected_dates[formattedDate] || false;
    }

    output.push({
      date: currentDate,
      completed_date,
      expected_date,
    });
  }
  
  return output;
};
