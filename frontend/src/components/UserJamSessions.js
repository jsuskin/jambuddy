import React, { Component } from 'react';
import { Table } from 'reactstrap';

export default class UserJamSessions extends Component {
  state = {
    sentRequests: [],
    receivedRequests: []
  }

  componentDidMount() {
    fetch(`http://localhost:3000/users/${this.props.currentUser.id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          sentRequests: data.sent_jam_requests,
          receivedRequests: data.received_jam_requests
        })
      })
  }

  render() {
    const requests = [...this.state.sentRequests, ...this.state.receivedRequests];
    return (
      <div className="jam-sessions-container">
        <div className="jam-sessions">
          <h1>Jam Sessions</h1>
          <div className="pending-requests-container">
            <h2>Pending</h2>
            <div className="pending-requests-scroller">
              <Table className="table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Weekday</th>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Sent by</th>
                    <th>Received by</th>
                    <th>Accept/Reject</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map(req => {
                    console.log(req);
                    // const date =
                    const rowId = requests.indexOf(req) + 1;
                    return (
                      <tr className="pending-request-row" key={rowId} id={`request-${rowId}`}>
                        <td>{rowId}</td>
                        <td>{req.weekday}</td>
                        <td>{`${req.month} ${req.day}, ${req.year}`}</td>
                        <td>{req.start_time}</td>
                        <td>{req.end_time}</td>
                        <td>{req.sender_id ? this.props.users.find(user => user.id === req.sender_id).username : this.props.currentUser.username}</td>
                        <td>{req.receiver_id ? this.props.users.find(user => user.id === req.receiver_id).username : this.props.currentUser.username}</td>
                        <td>{!req.sender_id ? req.status : (
                          <div>
                            <button>Accept</button>
                            <button>Reject</button>
                          </div>
                        )}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="accepted-requests-container">
            <h2>Accepted</h2>
            <div className="accepted-requests">
            </div>
          </div>
        </div>
      </div>
    )
  }
}
