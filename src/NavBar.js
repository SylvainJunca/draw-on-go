import React, { Component } from 'react';


class NavBar extends Component { 
  constructor () {
    super ()
    
  }

  render() {
    return (
      <div>
      {this.props.room ? <span>Room# {this.props.room} / Online : {this.props.players.length}</span> : ''}
      
      </div>
    )
  }
}
export default NavBar;