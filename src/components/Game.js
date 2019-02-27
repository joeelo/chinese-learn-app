import React, { Component } from 'react'

class Game extends Component {

  state = {
    readRules: false,
    score: 0,
    index: 0
  }
  
  createGameArray = () => {
    let gameArray = []
    for (let i = 0; i < 10; i++) {
      gameArray.push((this.props.characters[i]))
    }
    return gameArray;
  }

  checkCorrect = (event) => {
    if ( true ) {
      this.setState({
        score: this.state.score + 10
      })
    } else {
      alert("try again!")
    }
  }

  increaseIndex = () => {
    this.setState((prevState) => ({
      index: prevState.index + 3 
    }))
  }

  renderOneCharacter = () => {
    let currentIndex = this.state.index
    let character = this.createGameArray();
    let characterArray = [character[currentIndex], character[currentIndex + 1], character[currentIndex + 2]];
    return characterArray;
  }
  
  renderGame = () => {
    let array = this.renderOneCharacter(0)
    this.setState({
      readRules: !this.state.readRules,
      characterArray: array
    })
  }

  createRandomInt = () => {
    console.log( Math.floor(Math.random() * 3))
    return Math.floor(Math.random() * 3)
  }

  render() {
    console.log(this.createRandomInt())
    
    return (


      <div>

        {!this.state.readRules ? 

          <div> 
            <h1> How to play</h1>
            <button onClick={this.renderGame}> Understood </button>  
          </div>

        : 
             
          <div className="game-container" >
            <div className="score character-box">
              {this.state.score}
            </div>

            <div className="middle-character character-box">
              <span className="main-character" onClick={this.checkCorrect}> {this.renderOneCharacter()[this.createRandomInt()].pronunciation} </span>
            </div>

            <div className="top-character character-box" onClick={this.increaseIndex}>
              {this.renderOneCharacter()[0].chinese}
            </div>

            <div className="left-character character-box"> 
            {this.renderOneCharacter()[1].chinese}
            </div>

            <div className="right-character character-box" >
            {this.renderOneCharacter()[2].chinese}
            </div>


          </div>
        }
      </div>
    )
  }
}

export default Game