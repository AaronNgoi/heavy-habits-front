import React from 'react';

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
      className={`h-11 w-11 m-1px rounded-full flex items-center justify-center ${bgColor}`}
      />
  );
};

export default CircleDateDisplay;
