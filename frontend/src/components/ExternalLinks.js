import React, { Component } from 'react';

export default class ExternalLinks extends Component {
  render() {
    console.log(this.props.currentProfile)
    return (
      <div className="scroll-container external-links-container">
        <h2 className="white-item external-links-header">Links</h2>
        <div className="scroller external-links">
          {this.props.currentProfile.external_links.map(item => {
            return (
              <div key={this.props.currentProfile.external_links.indexOf(item)} className={"ext-link " + (this.props.currentProfile.external_links.indexOf(item)%2 === 0 ? "blue-item" : "white-item")}>
                <a href={item.url}>{item.url}</a>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
