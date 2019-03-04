import React, { Component } from 'react'

class Game extends Component {

  state = {
    readRules: false,
    score: 0,
    index: 0,
    timer: 30,
    randomInt: Math.floor(Math.random() * 3)
  }

  createGameArray = () => {
    let gameArray = []
    for (let i = 0; i < this.props.characters.length; i++) {
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
    if (char.chinese === event.target.innerText) {
      this.setState((prevState) => ({
        score: prevState.score + 10
      }))
    } else {
      console.log("wrong! or game over")
    }
    this.increaseIndex();
  }
  
  startTimer = () => {
    this.countDown = setInterval(() => {
      this.decrementTimer()
    }, 1000)
  }
  
  decrementTimer = () => {
    if (this.state.timer > 0) {
      this.setState((prevState) => ({
        timer: prevState.timer - 1 
      }))
    } else {
      clearInterval(this.countDown)
    }
    if (this.state.timer % 3 === 0 ) {
      this.increaseIndex();
      this.setState({
        randomInt: Math.floor(Math.random() * 3)
      })
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.countDown);
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

  runFuncs = () => {
    this.renderGame();
    this.startTimer();
  }

  render() {
      let selectedCharacter = this.renderOneCharacter()[this.state.randomInt]
      let topCharacter = this.renderOneCharacter()[0]
      let leftCharacter = this.renderOneCharacter()[1]
      let rightCharacter = this.renderOneCharacter()[2]
      console.log("re-render")
    return (
      <div>
        
        {!this.state.readRules ? 
          <div> 
            <h1> How to play </h1>
            <button onClick={this.runFuncs}> Understood </button>  
          </div>

        :  
        
          this.state.index < this.props.characters.length - 3 ?

            <div className="game-container" >
              <div className="score character-box">
                Score: {this.state.score}
              </div>

              <div className="timer character-box">
                
                Time: {this.state.timer}
              </div>

              <div className="middle-character character-box">
                <span className="main-character"> 
                  {selectedCharacter.pronunciation}
                </span>
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

          :

            <div> Completed!</div> 
        }

      </div>
    )
  }
}

export default Game