import React, { Component } from 'react';
import { Table } from 'reactstrap';

export default class UserJamSessions extends Component {
  state = {
    sentRequests: [],
    receivedRequests: [],
    acceptedRequests: [],
    rejectedRequests: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/jam_requests')
      .then(res => res.json())
      .then(requests => {
        this.setState({
          sentRequests: requests.filter(req => req.sender_id === this.props.currentUser.id),
          receivedRequests: requests.filter(req => req.receiver_id === this.props.currentUser.id),
          acceptedRequests: requests.filter(req => req.status === "Accepted"),
          rejectedRequests: requests.filter(req => req.status === "Rejected")
        })
      })
  }

  handleAcceptRequest = e => {
    console.log(e.target.id);
    fetch(`http://localhost:3000/jam_requests/${e.target.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        status: 'Accepted'
      })
    }).then(this.props.handleGetJamSessions)
    //.then(res => res.json()).then(acceptedRequest => this.setState({ acceptedRequests: [...this.state.acceptedRequests, acceptedRequest] }));
    // this.forceUpdate();
  }

  handleRejectRequest = e => {
    fetch(`http://localhost:3000/jam_requests/${e.target.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        status: 'Rejected'
      })
    }).then(this.props.handleGetJamSessions);
    // .then(res => res.json()).then(rejectedRequest => this.setState({
    //     acceptedRequests: this.state.acceptedRequests.includes(rejectedRequest) ? this.state.acceptedRequests.splice(this.state.acceptedRequests.indexOf(rejectedRequest), 1) : this.state.acceptedRequests,
    //     rejectedRequests: [...this.state.rejectedRequests, rejectedRequest]
    //   })
    // );
  }

  render() {
    const requests = [...this.state.sentRequests, ...this.state.receivedRequests];
    const rowId = (type, req) => requests.filter(r => r.status === type).indexOf(req) + 1;
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
                    if(req.status !== 'Pending') return null;
                    const reqId = req.id;
                    const date = `${req.month} ${req.day}, ${req.year}`
                    return (
                      <tr className="pending-request-row" key={"pending-" + rowId('Pending', req)} id={`pe-req-${rowId}`}>
                        <td>{rowId('Pending', req)}</td>
                        <td>{req.weekday}</td>
                        <td>{date}</td>
                        <td>{req.start_time}</td>
                        <td>{req.end_time}</td>
                        <td>{req.sender_id ? this.props.users.find(user => user.id === req.sender_id).username : this.props.currentUser.username}</td>
                        <td>{req.receiver_id ? this.props.users.find(user => user.id === req.receiver_id).username : this.props.currentUser.username}</td>
                        <td>{req.sender_id === this.props.currentUser.id ? req.status : (
                          <div>
                            <button onClick={this.handleAcceptRequest} id={reqId} name={`${date} ${req.start_time}-${req.end_time}`}>Accept</button>
                            <button onClick={this.handleRejectRequest} id={reqId} name={`${date} ${req.start_time}-${req.end_time}`}>Reject</button>
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
                  <th>Location</th>
                  <th>Cancel</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(req => {
                  if(req.status !== 'Accepted') return null;
                  const reqId = req.id;
                  const date = `${req.month} ${req.day}, ${req.year}`
                  const rowId = (type = "Accepted", request = req) => requests.filter(r => r.status === type).indexOf(request) + 1;
                  return (
                    <tr className="accepted-request-row" key={`accepted-${rowId()}`} id={`ac-req-${rowId()}`}>
                      <td>{rowId('Accepted', req)}</td>
                      <td>{req.weekday}</td>
                      <td>{date}</td>
                      <td>{req.start_time}</td>
                      <td>{req.end_time}</td>
                      <td>{req.sender_id ? this.props.users.find(user => user.id === req.sender_id).username : this.props.currentUser.username}</td>
                      <td>{req.receiver_id ? this.props.users.find(user => user.id === req.receiver_id).username : this.props.currentUser.username}</td>
                      <td>{req.jam_location ? `${req.jam_location.street_number} ${req.jam_location.street_name}, ${req.jam_location.city}, ${req.jam_location.state} ${req.jam_location.zip_code}` : (
                        <button onClick={() => this.props.handleSetLocation(req.id)}>Set Location</button>
                      )}</td>
                      <td>
                        <span id={reqId} className="cancel-session" onClick={this.handleRejectRequest}>
                          X
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
