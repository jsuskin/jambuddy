import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <div className="form">
        <form onSubmit={this.props.handleSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input type="text" name="username" id="username" />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input type="password" name="password" id="password" />
          <br />
          <input className="submit" type="submit" />
        </form>
      </div>
    )
  }
}
