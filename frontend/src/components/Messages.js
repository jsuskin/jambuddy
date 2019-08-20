import React, { Component } from 'react';
import { Table } from 'reactstrap';


export default class Messages extends Component {
  render() {
    const users = this.props.users;
    const whichView = this.props.msgClass === 'received messages';
    const msgClass = whichView ? this.props.currentUser.received_messages : this.props.currentUser.sent_messages;
    
    return (
      <div className="main-display-child messages">
        <h2 className="inbox-header">{whichView ? 'Inbox' : 'Sent Messages'} for {this.props.currentUser.username}</h2>
        <div className="msgs-btns">
          <button className="msgs-btn compose-new-msg-btn">Compose New</button>
          {whichView ? <button className="msgs-btn view-sent-msgs-btn" onClick={this.props.handleViewMsgClass}>Sent</button> : <button className="msgs-btn view-inbox-btn" onClick={this.props.handleViewMsgClass}>Inbox</button>}
        </div>
        <div className="messages-list">
          <Table className="table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Subject</th>
                <th>{whichView ? 'Sent by' : 'Sent to'}</th>
                <th>{whichView ? 'Received on' : 'Sent on'}</th>
              </tr>
            </thead>
            <tbody>
              {msgClass.map(msg => {
                // console.log(new Date(msg.created_at));
                const inboxId = msgClass.indexOf(msg) + 1;
                const createdAt = new Date(msg.created_at);
                return (
                  <tr className="inbox-row" key={inboxId} id={msg.subject} onClick={this.props.handleViewMessage}>
                    <td>{inboxId}</td>
                    <td>{msg.subject}</td>
                    <td>{whichView ? users.find(user => user.id === msg.sender_id).username : users.find(user => user.id === msg.receiver_id).username}</td>
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
