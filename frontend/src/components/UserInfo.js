import React, { Component } from 'react';

export default class UserInfo extends Component {
  render() {
    return (
      <div className="user-info">
        <h2 className="username white-item">{this.props.currentProfile.username}</h2>
        <p className="user-address white-item">{this.props.userAddress}</p>
      </div>
    )
  }
}
