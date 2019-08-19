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
    view: 'login'
  }

  componentDidMount() {
    fetch('http://localhost:3000/users').then(res => res.json()).then(users => {
      this.setState({
        users: users
      })
    })
  }

  getAddress() {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.currentProfile.user_location ? this.state.currentProfile.user_location.latitude : 40.7},${this.state.currentProfile.user_location ? this.state.currentProfile.user_location.longitude : -74}&key=${process.env.REACT_APP_GOOGLE_KEY}`).then(res => res.json()).then(data => this.setState({
    userAddress: data.results[0].formatted_address
    }))
  }

  handleSubmit = e => {
    e.preventDefault();

    const users = this.state.users,
          usernameInput = e.target.username.value,
          passwordInput = e.target.password.value,
          result = bcrypt.compareSync(passwordInput, users.find(user => user.username === usernameInput).password_digest)

    if(users.map(user => user.username).includes(usernameInput) && result) {
      this.setState({
        currentUser: users.find(user => user.username === usernameInput),
        currentProfile: users.find(user => user.username === usernameInput),
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
    // console.log(e.currentTarget.id);
    this.setState({
      currentMessage: this.state.currentUser.received_messages.find(msg => msg.subject === e.currentTarget.id),
      view: 'message'
    })
  }

  handleLogout = () => {
    this.setState({ currentUser: null, currentProfile: null })
  }

  handleLogoClick = () => {
    this.state.currentUser ? this.setState({view: 'profile', currentProfile: this.state.currentUser}) : this.setState({view: 'login'});
  }

  handleGetMessages = () => {
    this.setState({ view: 'messages' })
  }

  handleJamRequest = e => {
    console.log(e.target.textContent);
    if(this.props.currentUser === this.props.currentProfile) {
      // this.setState({ view: 'edit profile' });
    } else {
      // fetch
    }
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
      return <MainDisplay currentUser={this.state.currentUser} currentProfile={this.state.currentProfile} userAddress={this.state.userAddress} users={this.state.users} handleMarkerClick={this.handleMarkerClick} handleJamRequest={this.handleJamRequest} currentView={this.state.view} handleViewMessage={this.handleViewMessage} currentMessage={this.state.currentMessage} />
    }
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} handleLogoClick={this.handleLogoClick} handleLogout={this.handleLogout} renderRegister={this.renderRegister} handleEditProfile={this.handleEditProfile} handleGetMessages={this.handleGetMessages} />
        {this.renderWhich()}
      </div>
    );
  }
}
