import React from 'react';

export default function Interactions(props) {
    // console.log(this.props);
    return (
      <div className="interaction-buttons">
        {props.currentUser === props.currentProfile ? <button className="interaction-btn">Cool Button</button> : <button className="interaction-btn" onClick={props.handleNewMessage}>Send Message</button>}
        <button className="interaction-btn">unCool Button</button>
        <button className="interaction-btn">Butt Button</button>
      </div>
    )
  }
