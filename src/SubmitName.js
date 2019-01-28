import React, { Component } from 'react';

class SubmitName extends Component {
  
  render() {

    return (
      <form clasName='SubmitName' onSubmit={this.props.submitName}>
        <input type="text" name="name" placeholder="Enter your username" maxLength="10"/>
        <input type="submit"/>
      </form>
    )
  }
}

export default SubmitName;