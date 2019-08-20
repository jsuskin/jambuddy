import React, { Component } from 'react';

const instruments = [{instrument: 'Guitar', years_playing: 8}, {instrument: 'Piano', years_playing: 11}, {instrument: 'Bass', years_playing: 5}, {instrument: 'Drums', years_playing: 2}]

export default class InstrumentList extends Component {
  render() {
    return (
      <div className="scroll-container">
          <h2 className="white-item instrument-list-header">Instrument List</h2>
          <div className="scroller">
            {instruments.map(item => {
              return (
                  <div key={instruments.indexOf(item)} className={"item " + (instruments.indexOf(item)%2 === 0 ? "blue-item" : "white-item")}>
                    {JSON.stringify(item,null,2)}
                  </div>
              );
            })}
          </div>
      </div>
    )
  }
}
