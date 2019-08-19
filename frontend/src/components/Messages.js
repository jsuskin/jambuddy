import React, { Component } from 'react';
import { Table } from 'reactstrap';


export default class Messages extends Component {
  state = { view: 'received messages' }

  handleViewMsgClass = e => {
    switch(e.target.textContent) {
      case 'Sent':
        this.setState({
          view: 'sent messages'
        });
        break;
      case 'Inbox':
        this.setState({
          view: 'received messages'
        });
        break;
      default:
        return;
    }
  }

  render() {
    const users = this.props.users;
    const msgClass = this.state.view === 'received messages' ? this.props.currentUser.received_messages : this.props.currentUser.sent_messages;
    return (
      <div className="main-display-child messages">
        <h2 className="inbox-header">{this.state.view === 'received messages' ? 'Inbox' : 'Sent Messages'} for {this.props.currentUser.username}</h2>
        <div className="msgs-btns">
          <button className="msgs-btn compose-new-msg-btn">Compose New</button>
          {this.state.view === 'received messages' ? <button className="msgs-btn view-sent-msgs-btn" onClick={this.handleViewMsgClass}>Sent</button> : <button className="msgs-btn view-inbox-btn" onClick={this.handleViewMsgClass}>Inbox</button>}
        </div>
        <div className="messages-list">
          <Table className="table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Subject</th>
                <th>{this.state.view === 'received messages' ? 'Sent by' : 'Sent to'}</th>
                <th>{this.state.view === 'received messages' ? 'Received on' : 'Sent on'}</th>
              </tr>
            </thead>
            <tbody>
              {msgClass.map(msg => {
                console.log(new Date(msg.created_at));
                const inboxId = msgClass.indexOf(msg) + 1;
                const createdAt = new Date(msg.created_at);
                return (
                  <tr className="inbox-row" key={inboxId} id={msg.subject} onClick={this.props.handleViewMessage}>
                    <td>{inboxId}</td>
                    <td>{msg.subject}</td>
                    <td>{this.state.view === 'received messages' ? users.find(user => user.id === msg.sender_id).username : users.find(user => user.id === msg.receiver_id).username}</td>
                    <td>{createdAt.toString().split(' ').slice(0,5).join(' ')}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}
