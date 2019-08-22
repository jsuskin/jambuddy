import React, { Component } from 'react';

export default class InstrumentList extends Component {
  render() {
    return (
      <div className="scroll-container instrument-list-container">
          <h2 className="white-item instrument-list-header">Instruments</h2>
          <div className="scroller instrument-list">
            {this.props.currentProfile.user_instruments.map(item => {
              return (
                  <div key={this.props.currentProfile.user_instruments.indexOf(item)} className={"item " + (this.props.currentProfile.user_instruments.indexOf(item)%2 === 0 ? "blue-item" : "white-item")}>
                    {/*JSON.stringify(item,null,2)*/}
                    {`${item.name} // ${item.years_playing} years`}
                  </div>
              );
            })}
          </div>
      </div>
    )
  }
}
