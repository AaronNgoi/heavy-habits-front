import React from 'react';

const CircleWeekDisplay = ({ date, expected_date, completed_date, day }) => {
  let bgColour, fontColour;

  if (completed_date) {
    bgColour = 'bg-green';
    fontColour = 'text-biege-form-colour';
  } else if (expected_date && !completed_date) {
    bgColour = 'bg-red';
    fontColour = 'text-biege-form-colour';
  } else {
    bgColour = 'bg-biege-display';
    fontColour = 'text-brown-font';
  }

  return (
    <div 
      className={`h-6 w-6 rounded-full flex items-center justify-center ${bgColour}`}
      >
    <span className={`flex text-sm text-center ${fontColour}`}>{day}</span>
      </div>
  );
};

export default CircleWeekDisplay;
