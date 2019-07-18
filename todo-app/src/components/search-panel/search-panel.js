import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {
  state = {
    searchText: '',
  };
  onSearchFilter = (event) => {
    const searchText = event.target.value;
    this.setState({searchText});
    this.props.onSearchFilter(searchText);
  };

  render(){
    return (
      <input 
        type="text"
        className="form-control search-input"
        value={this.state.searchText}
        onChange={this.onSearchFilter}
        placeholder="type to search" />
    );
  }
};
