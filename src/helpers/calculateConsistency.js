import calculateCompletedDates from "./calculateCompletedDates";

function calculateConsistency(habit) {
  const completedCount = calculateCompletedDates(habit);
  const expectedDates = habit.expected_dates;
  let expectedCount = 0;

  for (const date in expectedDates) {
    if (expectedDates[date]) {
      expectedCount++;
    }
  }

  if (expectedCount === 0) {
    return 100;
  }

  const consistencyPercentage = (completedCount / expectedCount) * 100;
  return consistencyPercentage.toFixed(0);
}

export default calculateConsistency;

// ToolTip "Consistency measures how consistently you've kept up with your habit since you've started: {habit.created_date}. It's based on the number of times you've completed the habit compared to the number of times you were supposed to complete it. If your score is above 100%, you're really crushing it!