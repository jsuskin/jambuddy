import React from 'react';

export default function Message(props) {
  console.log(props);
  return (
    <div className="message">
      <h2>{props.currentMessage.subject}</h2>
      <h6>from: {props.sender.username}</h6>
      <div className="message-body"><p>{props.currentMessage.body}</p></div>
      <button className="msgs-btn reply-btn">Reply</button>
    </div>
  )
}
