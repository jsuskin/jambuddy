import React, { Component } from 'react';
import MapDisplay from './MapDisplay';
import Profile from './Profile';
import EditProfile from './EditProfile';
import Messages from './Messages';

export default class MainDisplay extends Component {
  render() {
    return (
      <div className="main-display">
        <MapDisplay currentUser={this.props.currentUser} users={this.props.users} handleMarkerClick={this.props.handleMarkerClick} />
        {(function(props) {
          switch(props.currentView) {
            case 'profile':
              return (<Profile currentUser={props.currentUser} currentProfile={props.currentProfile} userAddress={props.userAddress} handleJamRequest={props.handleJamRequest} />);
            case 'edit profile':
              return (<EditProfile currentUser={props.currentUser} />);
            case 'messages':
              return (<Messages currentUser={props.currentUser} users={props.users}/>)
            default:
              return;
          }
        })(this.props)}
      </div>
    )
  }
}
