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