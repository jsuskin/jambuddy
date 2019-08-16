import React, { Component } from "react";
import weekdays from '../data/weekdays';

function nextDate(dayIndex, weeksAhead) {
    var today = new Date();
    today.setDate(today.getDate() + (dayIndex - 1 - today.getDay() + (weeksAhead * 7)) % (weeksAhead * 7) + (7 * (weeksAhead - 1) + 1));//Math.pow(7 + 1, weeksAhead - 1));
    return today;
}

class UserAvailability extends Component {
  render() {
    const availabilities = this.props.currentProfile.user_availabilities;
    const dates = multiplier => availabilities.map(availability => {
      return `${nextDate(weekdays.indexOf(availability.day_of_week), multiplier).toString().split(' ').slice(0,4).join(' ')} ${availability.start_time}-${availability.end_time}`;
    });
    const formatDateToSort = x => x.split(' ').slice(0,4).join(' ');
    const sortedDates = [...dates(1), ...dates(2), ...dates(3), ...dates(4), ...dates(5), ...dates(6), ...dates(7)].sort((a,b) => {
      return new Date(formatDateToSort(a)) - new Date(formatDateToSort(b)) === 0 ? +a.split(/\W/)[4] - +b.split(/\W/)[4] : new Date(formatDateToSort(a)) - new Date(formatDateToSort(b));
    });

    return (
      <div className="scroll-container">
          <h2 className="white-item">Current Availability</h2>
          <div className="scroller">
            {sortedDates.map(date => {
              return (
                  <div key={sortedDates.indexOf(date)} className={"availability-entry item " + (sortedDates.indexOf(date)%2 === 0 ? "blue-item" : "white-item")} onClick={this.props.handleJamRequest}>
                    {date}
                  </div>
              );
            })}
          </div>
      </div>
    );
  }
}

export default UserAvailability;
