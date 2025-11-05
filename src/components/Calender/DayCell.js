import React, { Component } from "react";


class DayCell extends Component {
  makeLight = (hex, alpha = 0.25) => {
    if (!hex) return `rgba(0,0,0,${alpha})`;
    let c = hex.replace("#", "");
    if (c.length === 3) c = c.split("").map(x => x + x).join("");
    const num = parseInt(c, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  render() {
    const { dayNumber, eventsForDay, isToday, isInTodayWeek } = this.props;
    if (!dayNumber) return <div className="cell empty" />;
    const baseColor = eventsForDay[0]?.color || null;
    const cellStyle = baseColor ? { background: this.makeLight(baseColor, 0.22) } : {};
    const byTime = eventsForDay.reduce((acc, e) => {
      const t = e.time || "—";
      acc[t] = acc[t] ? acc[t] + 1 : 1;
      return acc;
    }, {});
    const hasConflicts = Object.values(byTime).some(count => count > 1);

    return (
      <div
        className={
          `cell ${isToday ? "today" : ""} ${isInTodayWeek ? "week-highlight" : ""} ${hasConflicts ? "conflict" : ""}`
        }
        style={cellStyle}
        title={hasConflicts ? "Time conflict detected" : undefined}
      >
        <div className="cell-top">
          <span className="date-num">{dayNumber}</span>
          {hasConflicts && <span className="conflict-dot" aria-label="Conflict">!</span>}
        </div>
        <div className="events-list">
          {eventsForDay.slice(0, 3).map(ev => (
            <div
              key={ev.id}
              className="event-pill"
              style={{
                background: this.makeLight(ev.color, 0.35),
                borderLeft: `3px solid ${ev.color}`
              }}
              title={`${ev.title} • ${ev.time} • ${ev.duration || ""}`}
            >
              <span className="event-time">{ev.time}</span>
              <span className="event-title">{ev.title}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default DayCell;
