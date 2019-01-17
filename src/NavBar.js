import React, { Component } from 'react';


class NavBar extends Component { 
  constructor () {
    super ()
    
  }

  render() {
    return (
      <div>
      {this.props.room ? <span>Connected to {this.props.room}</span> : ''}
      </div>
    )
  }
}
export default NavBar;