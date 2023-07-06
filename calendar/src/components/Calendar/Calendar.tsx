import React, { useEffect, useState } from "react";
import "./style.css";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleClick = (dateNumber: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      dateNumber
    );
    setCurrentDate(newDate);
    // handleDateSelect
    console.log(newDate);
  };

  const getNextMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1);
  };

  const getPrevMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() - 1);
  };

  const getMonthName = (date: Date, options: any) => {
    return date.toLocaleDateString("en-US", options);
  };

  const getDateList = (currentDate: Date) => {
    const datesInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth()
    ).getDay();

    const dateList: Array<number | null> = [];
    let day = 0;
    while (day < firstDayOfMonth) {
      dateList.push(null);
      day++;
    }
    for (let date = 1; date <= datesInMonth; date++) {
      dateList.push(date);
      day = (day + 1) % 7;
    }
    while (day < 7) {
      dateList.push(null);
      day++;
    }
    return dateList;
  };

  const dateList = getDateList(currentDate);

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={() => setCurrentDate(getPrevMonth(currentDate))}>
          &lt; {getMonthName(getPrevMonth(currentDate), { month: "short" })}
        </button>
        <h2>{getMonthName(currentDate, { month: "long", year: "numeric" })}</h2>
        <button onClick={() => setCurrentDate(getNextMonth(currentDate))}>
          {getMonthName(getNextMonth(currentDate), { month: "short" })} &gt;
        </button>
      </div>
      <div className="weekdays">
        <div className="weekday">Sun</div>
        <div className="weekday">Mon</div>
        <div className="weekday">Tue</div>
        <div className="weekday">Wed</div>
        <div className="weekday">Thu</div>
        <div className="weekday">Fri</div>
        <div className="weekday">Sat</div>
      </div>
      <div className="days">
        {dateList.map((dateNumber, index) => (
          <div
            key={index}
            onClick={() => dateNumber && handleClick(dateNumber)}
            className={`cell ${dateNumber ? "" : "empty"} ${
              dateNumber === currentDate.getDate() ? "curr" : ""
            }`}
          >
            {dateNumber}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
