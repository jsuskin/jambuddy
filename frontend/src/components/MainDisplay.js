import React, { Component } from 'react';
import MapDisplay from './MapDisplay';
import Profile from './Profile';
import EditProfile from './EditProfile';
import Messages from './Messages';
import Message from './Message';
import NewMessage from './NewMessage';

export default class MainDisplay extends Component {
  render() {
    // console.log(this.props.currentUser);
    return (
      <div className="main-display">
        <MapDisplay currentUser={this.props.currentUser} users={this.props.users} handleMarkerClick={this.props.handleMarkerClick} />
        {(function(props) {
          switch(props.currentView) {
            case 'profile':
              return (<Profile currentUser={props.currentUser} currentProfile={props.currentProfile} userAddress={props.userAddress} handleJamRequest={props.handleJamRequest} handleNewMessage={props.handleNewMessage} />);
            case 'edit profile':
              return (<EditProfile currentUser={props.currentUser} />);
            case 'messages':
              return (<Messages currentUser={props.currentUser} users={props.users} handleViewMessage={props.handleViewMessage}/>)
            case 'message':
              return (<Message currentMessage={props.currentMessage} sender={props.currentMessage.sender_id === props.currentUser.id ? null : props.users.find(user => user.id === props.currentMessage.sender_id)}/>)
            case 'new message':
              return (<NewMessage currentUser={props.currentUser} currentProfile={props.currentProfile} />)
            default:
              return;
          }
        })(this.props)}
      </div>
    )
  }
}
