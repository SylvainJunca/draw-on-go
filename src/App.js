import React, { Component } from 'react';
import ListRooms from './ListRooms'
import NavBar from './NavBar';
import './App.css';
import openSocket from 'socket.io-client';

class App extends Component {
  constructor() {
    super()
    this.state = {
      socket: openSocket('http://localhost:1337'),
      listRooms: [],
      room: null,
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
    const rooms = this.state.listRooms.map((room) => (
      <button onClick={() => {this.joinRoom(room)}} key={room}>{room}</button>
    ));
    const login = <div>
      <button onClick={this.pickRoom}>Enter a room</button>
      <form onSubmit={this.enterRoom}>
				<input type="text" name="room" placeholder="Enter the room" maxLength="6"/>
				<input type="submit" value="Get me in this room!" />
			</form>
    </div>

    

    return (
      <div className="App">
        <NavBar room={this.state.room} />
        <header>
          <p>
            Welcome to Draw On GO !
          </p>
        </header>
          {this.state.room ? '' : rooms}
          {this.state.room ? <p>You've entered room {this.state.room}</p> : login}
          {this.state.message}
          {this.state.error}
        
      
      </div>
    );
  }
}

export default App;
