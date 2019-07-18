import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
  state = {
    filters: [
      {'title': 'All', 'filter': '', checked: true},
      {'title': 'Active', 'filter': 'active', checked: false},
      {'title': 'Done', 'filter': 'done', checked: false},
    ],
  };

  handleFilter = (str) => {
    this.props.onFiltered(str);
    const newFilters = this.state.filters.map(item => {
      item.checked = !!(item.filter === str);
      return item;
    });
    this.setState({
      filters: newFilters
    })
  };

  render(){
    const { filters } = this.state;

    return (
      <div className="btn-group">
        {filters.map(({title, filter, checked}) =>
          <button 
            className={checked ? "btn btn-info" : "btn btn-outline-secondary"} 
            onClick={()=> this.handleFilter(filter)} 
            key={title}>
            {title}
          </button>
        )}
      </div>
    );
  }
}

