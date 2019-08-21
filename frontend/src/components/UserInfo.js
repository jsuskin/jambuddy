import React, { Component, Fragment } from 'react';

export default class UserInfo extends Component {
  render() {
    return (
      <div className="user-info">
        <div className="profile-header">
          <h2 className="username white-item">{this.props.currentProfile.username}</h2>
          {this.props.currentUser === this.props.currentProfile ? null : (
            <Fragment>
              <br/>
              <button className="profile-new-message" onClick={this.props.handleNewMessage}>Send Message</button>
              <button className="profile-jam-request">Request Jam Session</button>
            </Fragment>
          )}
        </div>
        <p className="user-address white-item">{this.props.userAddress}</p><br />
        <div className="user-bio">
          <h3 className="bio-header">About Me</h3>
          <p>{this.props.currentProfile.bio}</p>
        </div>
      </div>
    )
  }
}
