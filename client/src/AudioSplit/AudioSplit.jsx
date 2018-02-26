import React, { Component } from 'react';

class AudioSplit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, valueType) {
    this.setState({ [valueType]: event.target.value });
  }

  buttonRight(position, length, onAdd, onDelete) {
    if (position !== length) {
      return (
        <button
          className="btn btn-danger"
          onClick={() => onDelete(position - 1)}
          type="button"
        >
          <i className="fas fa-times"></i>
        </button>
      )
    } else {
      return (
        <button
          className="btn btn-success"
          onClick={onAdd}
          type="button"
        >
          <i className="fas fa-plus"></i>
        </button>
      )
    }
  }

  render() {
    const { position, length, onAdd, onDelete } = this.props;
    const { url } = this.state;
    const { handleChange } = this;
    return (
    <div id="url-input" className="input-group mb-3">
      <div className="input-group-prepend">
        <button
          className="btn btn-outline-secondary"
          type="button"
        >
          {position} / {length}
        </button>
      </div>
      <input
        type="text"
        className="form-control"
        placeholder="Start time"
        aria-label="Start time"
        aria-describedby="url-input-box"
        onChange={(event) => handleChange(event, 'start')}
      />
      <input
        type="text"
        className="form-control"
        placeholder="End time"
        aria-label="End time"
        aria-describedby="url-input-box"
        onChange={(event) => handleChange(event, 'end')}
      />
      <input
        type="text"
        className="form-control"
        placeholder="Track title"
        aria-label="Track title"
        aria-describedby="url-input-box"
        onChange={(event) => handleChange(event, 'title')}
      />
      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary"
          onClick={() => onAdd(url)}
          type="button"
        >
          Save
        </button>
      </div>
      <div className="input-group-append">
        {this.buttonRight(position, length, onAdd, onDelete)}
      </div>
    </div>
    );
  };
};

export default AudioSplit;