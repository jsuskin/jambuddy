import React from 'react';

export default class NewMessage extends React.Component {
  state = {
    subject: '',
    body: '',
    sender_id: this.props.currentUser.id,
    receiver_id: this.props.currentProfile.id
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSendMessage = e => {
    e.preventDefault();
    // console.log(e.target);
    fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...this.state })
    });
    e.target.reset()
  }

  render() {
    console.log(this.state);
  return (
    <div className="form new-message-form">
      <form onSubmit={this.handleSendMessage}>
        <label htmlFor="sender">From: </label><br />
        <input type="text" name="sender" id="sender" value={this.props.currentUser.username} readOnly/>
        <br />
        <label htmlFor="recipient">To: </label><br />
        <input type="text" name="recipient" id="recipient" value={this.props.currentProfile.username} readOnly/>
        <br />
        <label htmlFor="subject">Subject: </label><br />
        <input type="text" name="subject" id="subject" onChange={this.handleChange}/>
        <br />
        <label htmlFor="body">Message: </label><br />
        <textarea name="body" id="body" onChange={this.handleChange}></textarea>
        <br />
        <input type="submit" value="Send" />
      </form>
    </div>
  )}
}
