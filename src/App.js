import React, { Component } from 'react';
import NavBar from './NavBar';
import JoinGame from './JoinGame';
import SubmitName from './SubmitName';
import './App.css';
import openSocket from 'socket.io-client';

class App extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      listRooms: [],
      room: null,
      players: [],
      stage: '',
      message: '',
      error: '',
    }
  }
  static getHostName() {
		const parser = document.createElement('a');
		parser.href = document.location;
		return parser.hostname;
	}
  componentDidMount() {
    const hostname = App.getHostName();
    this.socket = openSocket('http://' + hostname + ':' + 1337);
    this.socket.on('connection', (received) => {
      console.log(received)
    })
    this.socket.on('listRooms', (listRooms) => {
      this.setState({listRooms: listRooms})
      console.log(`list of rooms :${listRooms}`)
    })
    this.socket.on('room', (received) => {
      this.setState({room : received})
      console.log(`entering room ${this.state.room}`)
    })
    this.socket.on('err', (message) => {
      this.setState( {error : message})
    })
    this.socket.on('players', (players) => {
      this.setState( {players : players})
    })
    this.socket.on('message', (message) => {
      this.setState({message : message});
      console.log(`message received : ${message}`)
    })
  }
  
  submitName = (event) => {
    event.preventDefault();
    const username = event.target.elements.name.value;
    console.log(username);
    this.socket.emit('username', username);
    this.setState({ username: username});
  }
  pickRoom = () => {
    this.socket.emit('room');
  }
  enterRoom = (event) => {
		event.preventDefault();
    const room = event.target.elements.room.value.toUpperCase();
    console.log(room)
		this.socket.emit('join', room);
  };
  joinRoom = (room) => {
    this.socket.emit('join', room);
  };
  
  render() {
    return (
      <div className="App">
        <NavBar room={this.state.room} players={this.state.players}/>
        {this.state.username ? '' : <SubmitName submitName={this.submitName}/>}
        <JoinGame gameData={this.state} pickRoom={this.pickRoom} joinRoom={this.joinRoom} JoinGame={this.JoinGame}/>    
      </div>
    );
  }
}

export default App;
