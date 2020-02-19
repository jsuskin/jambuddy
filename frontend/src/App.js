import React, { Component } from 'react';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import MainDisplay from './components/MainDisplay';
import bcrypt from 'bcryptjs';
import './App.css';

export default class App extends Component {
  state = {
    users: [],
    currentUser: null,
    currentProfile: null,
    currentMessage: null,
    userAddress: '',
    view: 'login',
    msgClass: 'received messages',
    requestId: null
  }

  componentDidMount() {
    fetch('http://localhost:3000/users').then(res => res.json()).then(users => {
      this.setState({
        users: users
      })
    })
  }

  getAddress() {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.currentProfile.user_location ? this.state.currentProfile.user_location.latitude : 40.7},${this.state.currentProfile.user_location ? this.state.currentProfile.user_location.longitude : -74}&key=${process.env.REACT_APP_GOOGLE_KEY}`)
      .then(res => res.json())
      .then(/*data => this.setState({
        userAddress: data.results[0].formatted_address
      })*/)
  }

  handleSubmit = e => {
    e.preventDefault();
    // debugger
    const usernameInput = e.target.username.value,
          passwordInput = e.target.password.value,
          result = bcrypt.compareSync(passwordInput, this.state.users.find(user => user.username === usernameInput).password_digest)

    if(this.state.users.map(user => user.username).includes(usernameInput) && result) {
      this.setState({
        currentUser: this.state.users.find(user => user.username === usernameInput),
        currentProfile: this.state.users.find(user => user.username === usernameInput),
        view: 'profile'
      }, () => this.getAddress());
    }
  }

  handleMarkerClick = profile => {
    if(profile) {
      this.setState({
        currentProfile: profile,
        view: 'profile'
      }, () => this.getAddress());
    }
  }

  handleEditProfile = () => {
    this.setState({
      view: 'edit profile'
    })
  }

  handleViewMessage = e => {
    this.setState({
      currentMessage: this.state.msgClass === 'received messages' ? this.state.currentUser.received_messages.find(msg => msg.subject === e.currentTarget.id) : this.state.currentUser.sent_messages.find(msg => msg.subject === e.currentTarget.id),
      view: 'message'
    })
  }

  handleViewMsgClass = e => {
    switch(e.target.textContent) {
      case 'Sent':
        this.setState({
          msgClass: 'sent messages'
        });
        break;
      case 'Inbox':
        this.setState({
          msgClass: 'received messages'
        });
        break;
      default:
        return;
    }
  }

  handleLogout = () => {
    this.setState({ currentUser: null, currentProfile: null })
  }

  handleLogoClick = () => {
    this.state.currentUser ? this.setState({view: 'profile', currentProfile: this.state.currentUser}) : this.setState({view: 'login'});
  }

  handleGetMessages = () => {
    this.setState({ view: 'messages', msgClass: 'received messages' });
  }

  handleNewMessage = () => {
    this.setState({ view: 'new message' });
  }

  handleGetJamSessions = () => {
    this.setState({ view: 'jam sessions' });
  }

  handleSetLocation = (rId) => {
    console.log(rId);
    this.setState({
      view: 'set location',
      requestId: rId
    });
  }

  handleGetProfile = () => {
    this.setState({ view: 'profile' });
  }

  renderRegister = () => {
    this.setState({
      view: 'register'
    })
  }

  renderWhich = () => {
    if(!this.state.currentUser) {
      return this.state.view === 'register' ? <Register /> : <Login handleSubmit={this.handleSubmit} />
    } else {
      return <MainDisplay currentUser={this.state.currentUser} currentProfile={this.state.currentProfile} userAddress={this.state.userAddress} users={this.state.users} handleMarkerClick={this.handleMarkerClick} currentView={this.state.view} handleViewMessage={this.handleViewMessage} currentMessage={this.state.currentMessage} handleNewMessage={this.handleNewMessage} handleViewMsgClass={this.handleViewMsgClass} msgClass={this.state.msgClass} handleSetLocation={this.handleSetLocation} requestId={this.state.requestId} handleGetJamSessions={this.handleGetJamSessions} handleGetProfile={this.handleGetProfile} />
    }
  }

  render() {
    console.log(this.state.users);
    return (
      <div>
        <Header currentUser={this.state.currentUser} handleLogoClick={this.handleLogoClick} handleLogout={this.handleLogout} renderRegister={this.renderRegister} handleEditProfile={this.handleEditProfile} handleGetMessages={this.handleGetMessages} handleGetJamSessions={this.handleGetJamSessions} />
        {this.renderWhich()}
      </div>
    );
  }
}
