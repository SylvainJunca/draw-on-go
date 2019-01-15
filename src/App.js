import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import openSocket from 'socket.io-client';

class App extends Component {
  constructor() {
    super()
    this.state = {
      socket: openSocket('http://localhost:1337'),
      room: null
    }
    
  }
  componentDidMount() {
    this.state.socket.on('connection', (received) => {
      console.log(received)
    })
    this.state.socket.on('room', (received) => {
      this.setState({room : received})
    })
  }
  
  pickRoom = () => {
    this.state.socket.emit('room');
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to Draw On GO !
          </p>
        </header>
      {this.state.room ? <p>{this.state.room}</p> : <button onClick={this.pickRoom}>Enter a room</button>}
      </div>
    );
  }
}

export default App;
