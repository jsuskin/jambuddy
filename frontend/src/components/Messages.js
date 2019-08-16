import React, { Component } from 'react';
import { Table } from 'reactstrap';


export default class Messages extends Component {
  render() {
    const users = this.props.users;
    console.log(this.props.currentUser)
    return (
      <div className="main-display-child messages">
        <h2 className="inbox-header">Inbox for {this.props.currentUser.username}</h2>
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
              <tr>
                <td>1</td>
                <td>eat a bag of shit</td>
                <td>{users[Math.floor(Math.random() * users.length)].username}</td>
                <td>{Date(Date.now()).split(' ').slice(0,5).join(' ')}</td>
              </tr>
              <tr>
                <td>2</td>
                <td>eat a bag of dicks</td>
                <td>{users[Math.floor(Math.random() * users.length)].username}</td>
                <td>{Date(Date.now()).split(' ').slice(0,5).join(' ')}</td>
              </tr>
              <tr>
                <td>3</td>
                <td>eat a bag of corn chips</td>
                <td>{users[Math.floor(Math.random() * users.length)].username}</td>
                <td>{Date(Date.now()).split(' ').slice(0,5).join(' ')}</td>
              </tr>
              <tr>
                <td>4</td>
                <td>eat a bag of hammers</td>
                <td>{users[Math.floor(Math.random() * users.length)].username}</td>
                <td>{Date(Date.now()).split(' ').slice(0,5).join(' ')}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}
