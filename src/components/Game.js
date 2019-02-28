import React, { Component } from 'react'

class Game extends Component {

  state = {
    readRules: false,
    score: 0,
    index: 0,
    timer: 30
  }
  
  createGameArray = () => {
    let gameArray = []
    for (let i = 0; i < 10; i++) {
      gameArray.push((this.props.characters[i]))
    }
    return gameArray;
  }

  increaseIndex = () => {
    this.setState((prevState) => ({
      index: prevState.index + 3 
    }))
  }

  gameLogic = (event, char) => {
    console.log(event.target.innerText)
    console.log(char);
    if (char.chinese === event.target.innerText) {
      this.setState((prevState) => ({
        score: prevState.score + 10
      }))
    } else {
      console.log("wrong!")
    }
    this.increaseIndex();
  }

  renderOneCharacter = () => {
    let currentIndex = this.state.index
    let character = this.createGameArray();
    let characterArray = [character[currentIndex], character[currentIndex + 1], character[currentIndex + 2]];
    return characterArray;
  }
  
  renderGame = () => {
    this.setState({
      readRules: !this.state.readRules,
    })
  }

  createRandomInt = () => {
    return Math.floor(Math.random() * 3)
  }

  render() {
      let selectedCharacter = this.renderOneCharacter()[this.createRandomInt()]
      let topCharacter = this.renderOneCharacter()[0]
      let leftCharacter = this.renderOneCharacter()[1]
      let rightCharacter = this.renderOneCharacter()[2]

    return (
      <div>

        {!this.state.readRules ? 
          <div> 
            <h1> How to play </h1>
            <button onClick={this.renderGame}> Understood </button>  
          </div>
        :             
          <div className="game-container" >
            <div className="score character-box">
              Score: {this.state.score}
            </div>

            <div className="timer character-box">
              
              Time: {this.state.timer}
            </div>

            <div className="middle-character character-box">
              <span className="main-character" > {selectedCharacter.pronunciation} </span>
            </div>

            <div className="top-character character-box" onClick={(event) => this.gameLogic(event, selectedCharacter)}>
              {topCharacter.chinese}
            </div>

            <div className="left-character character-box" onClick={(event) => this.gameLogic(event, selectedCharacter)}> 
             {leftCharacter.chinese}
            </div>

            <div className="right-character character-box" onClick={(event) => this.gameLogic(event, selectedCharacter)}>
              {rightCharacter.chinese}
            </div>

          </div>
        }

      </div>
    )
  }
}

export default Game