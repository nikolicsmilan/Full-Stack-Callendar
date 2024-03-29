import dayjs from 'dayjs';
import React, { useContext } from 'react';
import './CalendarHeader.css';

import GlobalContext from '../../context/GlobalContext';
export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  return (
    <React.Fragment>
      <button className="calendarheader-prev-button" onClick={handlePrevMonth}>
        <span> ◀</span>
      </button>
      <button onClick={handleReset} className="calendarheader-today-button">
        Today
      </button>
      <button className="calendarheader-next-button" onClick={handleNextMonth}>
        <span>▶ </span>
      </button>
      <h2 className="calendarheader-date">
        {dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
      </h2>
    </React.Fragment>
  );
}
