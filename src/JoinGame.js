import React, { Component } from 'react';

class JoinGame extends Component {
  
  render() {
    const rooms = this.props.gameData.listRooms.map((room) => (
      <button onClick={() => {this.joinRoom(room)}} key={room}>{room}</button>
    ));
    const login = <div>
      <button onClick={this.props.pickRoom}>Enter a room</button>
      <form onSubmit={this.props.enterRoom}>
        <input type="text" name="room" placeholder="Enter the room" maxLength="6"/>
        <input type="submit" value="Get me in this room!" />
      </form>
    </div>
    
    return (
      <div>
      {this.props.gameData.room ? '' : <div>{rooms} {login}</div>}
      {this.props.gameData.message}
      {this.props.gameData.error}
      </div>
    )
  }
}

export default JoinGame;