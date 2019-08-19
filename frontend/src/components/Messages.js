import React, { Component } from 'react';
import { Table } from 'reactstrap';


export default class Messages extends Component {
  render() {
    const users = this.props.users;
    console.log(this.props.currentUser)
    return (
      <div className="main-display-child messages">
        <h2 className="inbox-header">Inbox for {this.props.currentUser.username}</h2>
        <button className="compose-new-msg-btn">Compose New</button>
        <div className="messages-list">
          <Table className="table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Sent by</th>
                <th>Received on</th>
              </tr>
            </thead>
            <tbody>
              {this.props.currentUser.received_messages.map(msg => {
                const inboxId = this.props.currentUser.received_messages.indexOf(msg) + 1;
                return (
                  <tr className="inbox-row" key={inboxId} id={msg.subject} onClick={this.props.handleViewMessage}>
                    <td>{inboxId}</td>
                    <td>{msg.subject}</td>
                    <td>{users.find(user => user.id === msg.sender_id).username}</td>
                    <td>{Date(Date.now()).split(' ').slice(0,5).join(' ')}</td>
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
