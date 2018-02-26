import React, { Component } from 'react';

class URLInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ url: event.target.value });
  }

  render() {
    const { onAdd } = this.props;
    const { url } = this.state;
    const { handleChange } = this;
    return (
    <div id="url-input" className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Input URL"
        aria-label="Input URL"
        aria-describedby="url-input-box"
        onChange={handleChange}
        autoFocus
      />
      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary"
          onClick={() => onAdd(url)}
          type="button"
        >
          Add
        </button>
      </div>
    </div>
    );
  };
};


export default URLInput;