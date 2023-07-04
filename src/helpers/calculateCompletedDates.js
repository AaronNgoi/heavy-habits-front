function calculateCompletedDates(habit) {
  const completedDates = habit.completed_dates;
  let count = 0;

  for (const date in completedDates) {
    if (completedDates[date]) {
      count++;
    }
  }

  return count;
}

export default calculateCompletedDates;