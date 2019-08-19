import React from 'react';

export default function Message(props) {
  console.log(props);
  return (
    <div className="message">
      <h2>{props.currentMessage.subject}</h2>
      <h6>from: {props.sender.username}</h6>
      <p>{props.currentMessage.body}</p>
      <button>Reply</button>
    </div>
  )
}
