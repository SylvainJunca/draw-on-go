import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import openSocket from 'socket.io-client';

class App extends Component {
  constructor() {
    super()
    this.state = {
      socket: openSocket('http://localhost:1337'),
      room: null,
      error: ''
    }
    
  }
  componentDidMount() {
    this.state.socket.on('connection', (received) => {
      console.log(received)
    })
    this.state.socket.on('room', (received) => {
      this.setState({room : received})
      console.log(`entering room ${this.state.room}`)
    })
    this.state.socket.on('err', (message) => {
      this.setState( {error : message})
    })
  }
  
  pickRoom = () => {
    this.state.socket.emit('room');
  }
  enterRoom = (event) => {
		event.preventDefault();
    const room = event.target.elements.room.value.toUpperCase();
    console.log(room)
		this.state.socket.emit('join', room);
	};
  
  render() {

    const login = <div>
      <button onClick={this.pickRoom}>Enter a room</button>
      <form onSubmit={this.enterRoom}>
				<input type="text" name="room" placeholder="Enter the room" maxLength="6"/>
				<input type="submit" value="Get me in this room!" />
			</form>
    </div>

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to Draw On GO !
          </p>
          {this.state.room ? <p>You've entered room {this.state.room}</p> : login}
          {this.state.error}
        </header>
      
      </div>
    );
  }
}

export default App;
