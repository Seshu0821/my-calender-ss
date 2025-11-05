import React, { Component } from "react";
import dayjs from "dayjs";
import events from "./events.json";
import DayCell from "./DayCell";
import "./index.css";

class Calender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: dayjs(), 
    };
  }

  prevMonth = () => this.setState(({ currentDate }) => ({ currentDate: currentDate.subtract(1, "month") }));
  nextMonth = () => this.setState(({ currentDate }) => ({ currentDate: currentDate.add(1, "month") }));
  goToday   = () => this.setState({ currentDate: dayjs() });

  buildGrid = (dateObj) => {
    const start = dateObj.startOf("month");
    const end = dateObj.endOf("month");
    const startWeekday = start.day(); 
    const daysInMonth = end.date();
    const weeks = [];
    let week = [];  
    for (let i = 0; i < startWeekday; i++) week.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      week.push(d);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }
    if (week.length) {
      while (week.length < 7) week.push(null);
      weeks.push(week);
    }
    return weeks;
  };
  getEventsFor = (dateObj, dayNumber) => {
    const dateStr = dateObj.date(dayNumber).format("YYYY-MM-DD");
    return events.filter(e => e.date === dateStr);
  };
  isInTodaysWeek = (displayingDate, dayNumber) => {
    const cellDate = displayingDate.date(dayNumber);
    return dayjs().isSame(cellDate, "week");
  };

  render() {
    const { currentDate } = this.state;
    const grid = this.buildGrid(currentDate);
    const isShowingCurrentMonth = dayjs().isSame(currentDate, "month");
    const todayWeekday = dayjs().day();
    return (
      <div className="calendar-root">
        <div className="header">
          <div className="left">
            <button className="nav" onClick={this.prevMonth} aria-label="Previous month">◀</button>
            <button className="today-btn" onClick={this.goToday}>Today</button>
            <button className="nav" onClick={this.nextMonth} aria-label="Next month">▶</button>
            
          </div>
          <h2 className="title">{currentDate.format("MMMM YYYY")}</h2>
          <div className="right" />
        </div>

        <div className="grid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, idx) => (
            <div
              key={d}
              className={`dow ${isShowingCurrentMonth && idx === todayWeekday ? "dow-today" : ""}`}
            >
              {d}
            </div>
          ))}

          {grid.map((week, wi) => (
            <React.Fragment key={wi}>
              {week.map((dayNumber, di) => {
                if (!dayNumber) return <div key={`e-${wi}-${di}`} className="cell empty" />;
                const isToday = isShowingCurrentMonth && dayjs().date() === dayNumber;
                const eventsForDay = this.getEventsFor(currentDate, dayNumber);
                const inTodayWeek = this.isInTodaysWeek(currentDate, dayNumber) && dayjs().isSame(currentDate, "month");
                return (
                  <DayCell
                    key={`d-${wi}-${di}`}
                    dayNumber={dayNumber}
                    currentMonth={currentDate}
                    eventsForDay={eventsForDay}
                    isToday={isToday}
                    isInTodayWeek={inTodayWeek}
                  />
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}

export default Calender;
