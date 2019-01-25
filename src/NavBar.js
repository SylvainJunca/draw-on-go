import React, { Component } from 'react';


class NavBar extends Component { 

  render() {
    return (
      <div>
      {this.props.room ? <span>Room# {this.props.room} / Online : {this.props.players.length}</span> : <span>Not connected to a game</span>}
      
      </div>
    )
  }
}
export default NavBar;