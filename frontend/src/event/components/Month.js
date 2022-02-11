import React from 'react';
import Day from './Day';
export default function Month({ month }) {
  return (
    <div className="big-calendar">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i}></Day>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

