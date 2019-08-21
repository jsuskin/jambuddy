import React, { Component, Fragment } from "react";
import RequestModal from './RequestModal';
import weekdays from '../data/weekdays';

function nextDate(dayIndex, weeksAhead) {
    var today = new Date();
    today.setDate(today.getDate() + (dayIndex - 1 - today.getDay() + (weeksAhead * 7)) % (weeksAhead * 7) + (7 * (weeksAhead - 1) + 1));//Math.pow(7 + 1, weeksAhead - 1));
    return today;
}

export default class UserAvailability extends Component {
  state = {
    isOpen: false,
    selectedDate: {
      weekday: '',
      month: '',
      day: '',
      year: '',
      startTime: '',
      endTime: ''
    }
  }

  toggleModal = e => {
    if(this.props.currentUser === this.props.currentProfile) return null;
    const [weekday, month, day, year, startTime, endTime] = e.target.textContent.split(/(?!:)\W/);
    this.setState({
      isOpen: !this.state.isOpen,
      selectedDate: {
        weekday: weekday,
        month: month,
        day: day,
        year: year,
        startTime: startTime,
        endTime: endTime
      }
    });
  }

  handleJamRequest = sd => {
    fetch('http://localhost:3000/jam_requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        weekday: sd.weekday,
        month: sd.month,
        day: sd.day,
        year: sd.year,
        start_time: sd.startTime,
        end_time: sd.endTime,
        sender_id: this.props.currentUser.id,
        receiver_id: this.props.currentProfile.id
      })
    })
    this.setState({ isOpen: !this.state.isOpen })
  }

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
          <h2 className="white-item current-availability-header">Current Availability</h2>
          <div className="scroller">
          <RequestModal show={this.state.isOpen} onClose={this.toggleModal} selectedDate={this.state.selectedDate} handleJamRequest={this.handleJamRequest}>Request Session</RequestModal>
            {sortedDates.map(date => {
              return (
                <div key={sortedDates.indexOf(date)} className={"availability-entry item " + (sortedDates.indexOf(date)%2 === 0 ? "blue-item" : "white-item")} onClick={this.toggleModal}>
                  {date}
                </div>
              );
            })}
          </div>
      </div>
    );
  }
}
