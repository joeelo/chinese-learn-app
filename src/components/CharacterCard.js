import React, { Component } from 'react'


class CharacterCard extends Component {

  state = {
    liked: false
  }

  likeHandler = () => {
    if (this.state.liked === false) {
      fetch(`http://localhost:3001/api/v1/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }, 
        body: JSON.stringify({character_id: this.props.character.id, user_id: this.props.user.id})
      })
      .then(console.log)
      this.setState({
        liked: true
      })
      console.log(this.state.liked);
    } else if (this.state.liked === true) {
      this.setState({
        liked: false
      })
    }
  }

  unlikeFunctions = (characterId) => {
    this.props.removeLikeHandler(characterId);
    this.unlikeHandler();
  }

  unlikeHandler = () => {
    let userId = this.props.user.id
    let characterId = this.props.character.id
    fetch(`http://localhost:3001/api/v1/likesdestroy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }, 
      body: JSON.stringify({character_id: characterId, user_id: userId})
    })
    .then(res => res.json())
  }

  render() {
    return (
      <div className="character-card">
        <h1> {this.props.character.chinese} </h1>
        <h3> {this.props.character.pronunciation}</h3>
        <h3> {this.props.character.meaning}</h3>

          {!this.props.renderedBy ? 
            <button className="like-button" onClick={this.likeHandler}> Like </button>
          :
            <button className="like-button" onClick={() => this.unlikeFunctions(this.props.character.id)}> Unlike </button>
          }

      </div>
    )
  }
}

export default CharacterCard