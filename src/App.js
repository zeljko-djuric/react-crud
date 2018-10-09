import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state={
      newTodo: '',
      todos: [{
        id: 1, name: 'Play basketball'
      },{
        id: 2, name: 'Buy some clothes'
      },{
        id: 3, name: 'Write some code'
      },{
        id:4, name: 'Wach movies'
      }]
    }
    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  handleChange(event){
    this.setState({
      newTodo: event.target.value
    })
  }

  addTodo(){

  }

  render() {
    console.log(this.state.newTodo);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

        <div className="container">
          <input type="text" name="todo" className="my-4 form-control" placeholder="Add a new todo" onChange={this.handleChange} value={this.state.newTodo} />
          <button onClick={this.addTodo} className="btn-info mb-3 form control">
            Add ToDo
          </button>
          <ul className="list-group">
           {this.state.todos.map((item) => {
             return <li key={item.id} className="list-group-item">{item.name}</li>
           })}
            
          </ul>
        </div>


      </div>
    );
  }
}

export default App;
