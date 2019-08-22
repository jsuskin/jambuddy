import React, { Component } from 'react';

export default class SetLocation extends Component {
  state = {
    "street-number": '',
    "street-name": '',
    "city": '',
    "state": '',
    "zip-code": ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSetLocation = e => {
    e.preventDefault();
    // console.log(this.props.requestId);
    fetch(`http://localhost:3000/jam_locations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "street_number": +this.state['street-number'],
        "street_name": this.state['street-name'],
        "city": this.state.city,
        "state": this.state.state,
        "zip_code": +this.state['zip-code'],
        "jam_request_id": this.props.requestId
      })
    }).then(this.props.handleGetJamSessions);
  }

  render() {
    console.log(this.state);
    return (
      <div className="form-container">
        <form onSubmit={this.handleSetLocation}>
          <label htmlFor="street-number">Street Number</label><br/>
          <input type="text" name="street-number" id="street-number" onChange={this.handleChange} /><br/>
          <label htmlFor="street-name">Street Name</label><br/>
          <input type="text" name="street-name" id="street-name" onChange={this.handleChange} /><br/>
          <label htmlFor="city">City</label><br/>
          <input type="text" name="city" id="city" onChange={this.handleChange} /><br/>
          <label htmlFor="state">State</label><br/>
          <input type="text" name="state" id="state" onChange={this.handleChange} /><br/>
          <label htmlFor="zip-code">Zip Code</label><br/>
          <input type="text" name="zip-code" id="zip-code" onChange={this.handleChange} /><br/>
          <input type="submit" />
        </form>
      </div>
    )
  }
}
