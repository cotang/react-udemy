import React, { Component } from 'react';
import './item-add.css';

export default class ItemAdd extends Component {
  state = {
    value: '',
  };
  onLabelChange = (event) => {
    this.setState({
      value: event.target.value
    });
  };
  onSubmit = (event) => {
    event.preventDefault();
    this.props.onAdded(this.state.value);
    this.setState({
      value: '',
    });
  };

  render(){
    return (
      <form 
        className="bottom-panel d-flex"
        onSubmit={this.onSubmit} >
        <input 
          type="text"
          className="form-control new-todo-label"
          value={this.state.value}
          placeholder="Add todo"
          onChange={this.onLabelChange} /> 
        <button 
          type="submit"
          className="btn btn-outline-secondary">Add</button>
      </form>
    );
  };
};
