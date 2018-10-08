import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
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
          <h2 className="text-center p4"> Todos Appp</h2>
          <ul className="list-group">
            <li className="list-group-item">
              Some list item!
            </li>
            <li className="list-group-item">
              TODO: something
            </li>
            <li className="list-group-item">
              FIX: all !
            </li>
            
          </ul>
        </div>


      </div>
    );
  }
}

export default App;
