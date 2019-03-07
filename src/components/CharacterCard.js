import React, { Component } from 'react'


class CharacterCard extends Component {

  state = {
    liked: false, 
    destroyed: 1
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
    }).then(res => res.json())
    .then(this.setState({
      destroyed: this.state.destroyed + 1 
    }))
  }

  render() {
    return (
      <div className="character-card">
        <h1> {this.props.character.chinese} </h1>
        <h3> {this.props.character.pronunciation}</h3>
        <h3> {this.props.character.meaning}</h3>

          {!this.props.renderedBy ? 
            <button onClick={this.likeHandler}> Like </button>
          :
            <button onClick={this.unlikeHandler}> Unlike </button>
          }

      </div>
    )
  }
}

export default CharacterCard