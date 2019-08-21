import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class RequestModal extends Component {
  render() {
    const selectedDate = this.props.selectedDate;
    return !this.props.show ? null : (
      <div className="backdrop">
        <div className="modal">
          {this.props.children}
          <div className="footer">
            <button onClick={() => this.props.handleJamRequest(selectedDate)}>Request</button>
            <button onClick={this.props.onClose}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

RequestModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
}
