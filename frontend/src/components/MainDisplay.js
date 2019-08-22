import React, { Component } from 'react';
import MapDisplay from './MapDisplay';
import Profile from './Profile';
import EditProfile from './EditProfile';
import Messages from './Messages';
import Message from './Message';
import NewMessage from './NewMessage';
import UserJamSessions from './UserJamSessions';
import SetLocation from './SetLocation';

export default class MainDisplay extends Component {
  render() {
    // console.log(this.props.currentUser);
    return (
      <div className="main-display">
        {<MapDisplay currentUser={this.props.currentUser} users={this.props.users} handleMarkerClick={this.props.handleMarkerClick} />}
        {(function(props) {
          // console.log(props.currentMessage);
          switch(props.currentView) {
            case 'profile':
              return (<Profile currentUser={props.currentUser} currentProfile={props.currentProfile} userAddress={props.userAddress}  handleNewMessage={props.handleNewMessage} />);
            case 'edit profile':
              return (<EditProfile currentUser={props.currentUser} />);
            case 'messages':
              return (<Messages currentUser={props.currentUser} users={props.users} handleViewMessage={props.handleViewMessage} handleViewMsgClass={props.handleViewMsgClass} msgClass={props.msgClass} />)
            case 'message':
              return (<Message currentMessage={props.currentMessage} sender={props.msgClass === 'received messages' ? props.users.find(user => user.id === props.currentMessage.sender_id) : props.currentUser} receiver={props.msgClass === 'sent messages' ? props.users.find(user => user.id === props.currentMessage.receiver_id) : props.currentUser} handleUserClick={props.handleMarkerClick} handleReply={props.handleNewMessage} />)
            case 'new message':
              return (<NewMessage currentUser={props.currentUser} currentProfile={props.currentProfile} />)
            case 'jam sessions':
              return <UserJamSessions users={props.users} currentUser={props.currentUser} currentProfile={props.currentProfile} handleSetLocation={props.handleSetLocation} handleGetJamSessions={props.handleGetJamSessions} />
            case 'set location':
              return <SetLocation currentUser={props.currentUser} requestId={props.requestId} handleGetJamSessions={props.handleGetJamSessions} />
            default:
              return;
          }
        })(this.props)}
      </div>
    )
  }
}
