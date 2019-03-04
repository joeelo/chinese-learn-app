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
        body: JSON.stringify({character_id: this.props.character.id, user_id: 15})
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

  render() {
    return (
      <div className="character-card">
        <h1> {this.props.character.chinese} </h1>
        <h3> {this.props.character.pronunciation}</h3>
        <h3> {this.props.character.meaning}</h3>

          <button onClick={this.likeHandler}> 
            {!this.state.liked ? "like" : "unlike"}
          </button>

          <button> save </button>

      </div>
    )
  }
}

export default CharacterCard