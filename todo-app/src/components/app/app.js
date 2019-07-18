import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAdd from '../item-add';

import './app.css';

export default class App extends Component {
  start = 0;
  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    searchText: '',
    appFilter: ''
  };
  createTodoItem(label) {
    return {
      label,
      important: false, 
      done: false, 
      id: this.start++
    }
  }
  deleteItem = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: todoData.filter((item)=>item.id !== id)
      };
    });
  };
  addItem = (text) => {
    this.setState(({todoData}) => {
      const newItem = this.createTodoItem(text);
      return {
        todoData: [...this.state.todoData, newItem ]
      };
    });
  };
  onSearchFilter = (searchText) => {
    this.setState({searchText});
  };
  search(items, searchText){
    if (searchText){ 
      return items.filter(item => {
        return item.label.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
      });
    } else {
      return items;
    }
  }
  filterItems = (marker) => {
    this.setState({
      appFilter: marker
    });
  };
  filter(items, filterText){
    if (filterText === 'done') {
      return items.filter(item => item.done);
    } else if (filterText === 'active') {
      return items.filter(item => !item.done);
    } else {
      return items;
    }
  }
  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((item)=>item.id === id);
    const oldItem = arr[idx]
    const newItem = {...oldItem, [propName]: !oldItem[propName] }
    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1),
    ]
  };
  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };
  onToggleDone = (id) => {
    this.setState(({todoData}) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  render(){
    const { todoData, searchText, appFilter } = this.state;

    const visibleItems = this.filter(this.search(todoData, searchText), appFilter);

    const doneCount = todoData.filter((item)=>item.done === true).length;
    const undoneCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={undoneCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchFilter={this.onSearchFilter} />
          <ItemStatusFilter onFiltered={this.filterItems} />
        </div>

        <TodoList 
          todos={visibleItems}
          onDeleted={this.deleteItem} 
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone} />
        <ItemAdd onAdded={this.addItem} />
      </div>
    );
  }
};
