import React, { Component } from 'react';
import NavBar from './NavBar';
import JoinGame from './JoinGame';
import './App.css';
import openSocket from 'socket.io-client';

class App extends Component {
  constructor() {
    super()
    this.state = {
      socket: openSocket('http://localhost:1337'),
      listRooms: [],
      room: null,
      stage: '',
      message: '',
      error: '',
    }
    
  }
  componentDidMount() {
    this.state.socket.on('connection', (received) => {
      console.log(received)
    })
    this.state.socket.on('listRooms', (listRooms) => {
      this.setState({listRooms: listRooms})
      console.log(`list of rooms :${listRooms}`)
    })
    this.state.socket.on('room', (received) => {
      this.setState({room : received})
      console.log(`entering room ${this.state.room}`)
    })
    this.state.socket.on('err', (message) => {
      this.setState( {error : message})
    })
    this.state.socket.on('message', (message) => {
      this.setState({message : message});
      console.log(`message received : ${message}`)
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
  joinRoom = (room) => {
    this.state.socket.emit('join', room);
  };
  
  
  render() {
    return (
      <div className="App">
        <NavBar room={this.state.room} />
        <JoinGame gameData={this.state} pickRoom={this.pickRoom} joinRoom={this.joinRoom} JoinGame={this.JoinGame}/>    
      </div>
    );
  }
}

export default App;
