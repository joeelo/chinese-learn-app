import React, { Component } from 'react'


class CharacterCard extends Component {
  render() {
    return (
      <div className="character-card">
        <h1> {this.props.character.chinese} </h1>
        <h3> {this.props.character.pronunciation}</h3>
        <h3> {this.props.character.meaning}</h3>
      </div>
    )
  }
}

export default CharacterCard