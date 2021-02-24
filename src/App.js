import { useState } from 'react';
import './App.css';

export default function App() {
  const calendarDates = Array(31).fill(0).map((e, i) => i);

  const [choosingDate, setChoosingDate] = useState('start');
  const [hoverEffect, setHoverEffect] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleUpdateCalendar = (day) => {
    if (startDate && day < startDate) {
      setStartDate(day);
      return setChoosingDate('end');
    }
    if (endDate && day > endDate) {
      setEndDate(day);
      return setChoosingDate('end');
    }
    if (choosingDate === 'start') {
      setStartDate(day);
      return setChoosingDate('end');
    }
    if (choosingDate === 'end') {
      setEndDate(day);
    }
  }

  const handleIsBetween = (day) => {
    if (startDate && !endDate) return day > startDate && day < hoverEffect;
    return day > startDate && day < endDate;
  }

  return (
    <>
      <div className="date-chooser">
        <button
          className={`date-chooser-button ${choosingDate === 'start' ? 'ischoosing' : ''}`}
          onClick={() => setChoosingDate('start')}
        >
          Start Date <span>{startDate}</span>
        </button>
        <button
          className={`date-chooser-button ${choosingDate === 'end' ? 'ischoosing' : ''}`}
          onClick={() => setChoosingDate('end')}
        >
          End Date <span>{endDate}</span>
        </button>
      </div>
      <div className="calendar">
        {calendarDates.map((day, index) => {

          const dayNumber = day + 1;
          let selected = dayNumber === startDate || dayNumber === endDate;
          let isBetween = handleIsBetween(dayNumber);

          return (
            <button
              className={`calendar-day ${selected ? 'selected' : ''} ${isBetween ? 'between' : ''}`}
              key={index}
              onClick={() => handleUpdateCalendar(dayNumber)}
              onMouseOver={() => setHoverEffect(dayNumber)}
            >
              {dayNumber}
            </button>)
        })}
      </div>
    </>
  );
}