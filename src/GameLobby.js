import React, { Component } from 'react';

class GameLobby extends Component {

  render() {
    const players = this.props.gameData.players.map((player) => (
      <li key={player}>{player}</li>
    ));
    return (
      <ol>
        {players}
      </ol>
    )
  }
}
export default GameLobby;