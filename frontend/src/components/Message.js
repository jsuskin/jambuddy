import React from 'react';

export default function Message(props) {
  const createdAt = new Date(props.currentMessage.created_at);
  return (
    <div className="message">
      <h2>{props.currentMessage.subject}</h2>
      <div className="to-from">
        <h6>to: <span className="clickable-user" onClick={() => props.handleUserClick(props.receiver)}>{props.receiver.username}</span></h6>
        <h6>from: <span className="clickable-user" onClick={() => props.handleUserClick(props.sender)}>{props.sender.username}</span></h6>
      </div>
      <h6 className="sent-on">Sent on: {createdAt.toString().split(' ').slice(0,5).join(' ')}</h6>
      <div className="message-body"><p>{props.currentMessage.body}</p></div>
      <button className="msgs-btn reply-btn" onClick={props.handleReply}>Reply</button>
    </div>
  )
}
