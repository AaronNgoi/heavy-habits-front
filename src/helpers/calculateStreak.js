import { parse, compareAsc } from 'date-fns';

function calculateStreak(habit) {
  const completedDates = habit.completed_dates;
  const expectedDates = habit.expected_dates;
  let currentStreak = 0;

  const sortedDates = Object.keys(completedDates)
    .map((dateString) => parse(dateString, 'dd/MM/yyyy', new Date()))
    .sort(compareAsc);

  for (const date of sortedDates) {
    const dateString = date.toLocaleDateString('en-GB'); // Convert Date object back to string

    if (completedDates[dateString]) {
      currentStreak++;
    } else if (expectedDates[dateString]) {
      currentStreak = 0;
    }
  }

  return currentStreak;
}

export default calculateStreak;