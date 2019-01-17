import React from 'react';


const ListRooms = (room) => {
  render () {
    return (
      <button onClick={() => this.joinRoom(room)}>room</button> 
    )
  }
}
export default ListRooms;