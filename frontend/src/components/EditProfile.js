import React, { Component } from 'react';
import weekdays from '../data/weekdays';

function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

export default class EditProfile extends Component {
  state = {
    "instrument-name": '',
    "years-playing": '',
    dayOfWeek: 'Sunday',
    startHours: '00',
    startMinutes: '00',
    endHours: '00',
    endMinutes: '00',
    userId: this.props.currentUser.id
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleUpdateProfile = e => {
    e.preventDefault();
    if(+this.state.startHours < +this.state.endHours || (+this.state.startHours === +this.state.endHours && +this.state.startMinutes < +this.state.endMinutes))
    {
      fetch('http://localhost:3000/user_availabilities', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "day_of_week": this.state.dayOfWeek,
          "start_time": `${this.state.startHours}:${this.state.startMinutes}`,
          "end_time": `${this.state.endHours}:${this.state.endMinutes}`,
          "user_id": this.state.userId
        })
      }).then(this.props.handleGetProfile);
    } else { alert('Invalid Input') }
  }

  handleAddInstrument = e => {
    e.preventDefault();
    fetch(`http://localhost:3000/user_instruments`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state["instrument-name"],
        years_playing: this.state["years-playing"],
        user_id: this.state.userId
      })
    }).then(this.props.handleGetProfile)
  }

  render() {
    return (
      <div className="edit-profile-form">
        <form onSubmit={this.handleAddInstrument}>
          <div className="add-instrument-form">
            <h2>Add Instrument</h2>
            <label htmlFor="instrument-name">Instrument</label>
            <input type="text" name="instrument-name" onChange={this.handleChange} /><br/>
            <label htmlFor="years-playing">Years Playing</label>
            <input type="text" name="years-playing" onChange={this.handleChange} /><br/>
          </div>
          <input type="submit" />
        </form>
        <br/><br/>
        <form onSubmit={this.handleUpdateProfile}>
          <div className="availability-selection">
            <h2>Add Availability</h2>
            <div className="weekday-availability-select">
              <h3>Choose a Day</h3>
              <select name="dayOfWeek" id="dayOfWeek" onChange={this.handleChange}>
                {weekdays.map(day => <option key={day} value={day}>{day}</option>)}
              </select>
            </div>
            <div id="start-time" className="time-select-group">
            <h3>Choose Start Time</h3>&nbsp;
              <div id="time-select hours-div">
                <select name="startHours" id="startHours" onChange={this.handleChange}>
                  {range(24,0).map(num => num.toString().length < 2 ? `0${num}` : num).map(num => <option key={num} value={num}>{num}</option>)}
                </select>
              </div>&nbsp;:&nbsp;
              <div id="time-select minutes-div">
                <select name="startMinutes" id="startMinutes" onChange={this.handleChange}>
                  {range(59,0).map(num => num.toString().length < 2 ? `0${num}` : num).map(num => <option key={num} value={num}>{num}</option>)}
                </select>
              </div>
            </div>
            <div id="end-time" className="time-select-group">
            <h3>Choose end time</h3>&nbsp;
              <div id="time-select hours-div">
                <select name="endHours" id="endHours" onChange={this.handleChange}>
                  {range(24,0).map(num => num.toString().length < 2 ? `0${num}` : num).map(num => <option key={num} value={num}>{num}</option>)}
                </select>
              </div>&nbsp;:&nbsp;
              <div id="time-select minutes-div">
                <select name="endMinutes" id="endMinutes" onChange={this.handleChange}>
                  {range(59,0).map(num => num.toString().length < 2 ? `0${num}` : num).map(num => <option key={num} value={num}>{num}</option>)}
                </select>
              </div>
            </div>
          </div>
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
}
