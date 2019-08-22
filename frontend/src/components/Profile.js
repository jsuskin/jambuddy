import React, { Component } from 'react';
import UserInfo from './UserInfo';
import UserAvailability from './UserAvailability';
import InstrumentList from './InstrumentList';
import ExternalLinks from './ExternalLinks';

export default class Profile extends Component {
  render() {
    return (
      <div className="main-display-child profile">
        <img className="user-avatar"
          src={this.props.currentProfile ? this.props.currentProfile.image : null}
          alt="user avatar"
        />
        <UserInfo currentUser={this.props.currentUser} currentProfile={this.props.currentProfile} userAddress={this.props.userAddress} handleNewMessage={this.props.handleNewMessage} />
        <div className="scrollers">
          <UserAvailability currentProfile={this.props.currentProfile} currentUser={this.props.currentUser} />
          <div className="musician-info-container">
            <InstrumentList currentProfile={this.props.currentProfile} />
            <ExternalLinks currentProfile={this.props.currentProfile} />
          </div>
        </div>
      </div>
    )
  }
}
