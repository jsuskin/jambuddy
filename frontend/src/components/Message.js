import React from 'react';

export default function Message(props) {
  // debugger
  // console.log(props);
  const createdAt = new Date(props.currentMessage.created_at);
  return (
    <div className="message">
      <h2>{props.currentMessage.subject}</h2>
      <div className="to-from">
        <h6>to: {props.receiver.username}</h6>
        <h6>from: {props.sender.username}</h6>
      </div>
      <h6 class="sent-on">Sent on: {createdAt.toString().split(' ').slice(0,5).join(' ')}</h6>
      <div className="message-body"><p>{props.currentMessage.body}</p></div>
      <button className="msgs-btn reply-btn">Reply</button>
    </div>
  )
}
