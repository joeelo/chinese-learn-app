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

  changeRandomInt = () => {
    this.setState({
      randomInt: Math.floor(Math.random() * 3)
    })
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
    this.changeRandomInt();
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

  postScore = () => {
    let scoreObj = {
      user_id: this.props.user.id,
      points: this.state.score
    }
    if (this.state.timer === 1) {
      fetch("http://localhost:3001/api/v1/scores", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json", 
          "Accept": "application/json"
        }, 
        body: JSON.stringify(scoreObj)
      })
      .then(res => res.json())
      .then(console.log)
  
    }
  }

  render() {
      let selectedCharacter = this.renderOneCharacter()
      let topCharacter = this.renderOneCharacter()[0]
      let leftCharacter = this.renderOneCharacter()[1]
      let rightCharacter = this.renderOneCharacter()[2]
    return (
      <div>
        
        {!this.state.readRules ? 
          <div> 
            <h1> How to play </h1>
            <section className="rules-section">
              1. There is a 30 second timer, 
                  <br/>
                when the timer is up, the game will end
                  <br/>
              2. When you click on a character, 
                  <br/>
                if the match is correct your score will increase by 10
                  <br/>
              3. If you don't know, don't worry, 
                  <br/> 
                you will soon enough, just take your best guess
            </section>
            <button className="run-game-btn" onClick={this.runFuncs}> I got this! </button>  
          </div>

        :  
        
          this.state.index < this.props.characters.length - 3 && this.state.timer > 0 ?

            <div className="game-container" >
              <div className="score character-box">
                Score: {this.state.score}
              </div>

              <div className="timer character-box">
                
                Time: {this.state.timer}
              </div>

              <div className="middle-character character-box">
                <span className="main-character"> 
                  {selectedCharacter[this.state.randomInt].pronunciation}
                </span>
              </div>

              <div className="top-character character-box" onClick={(event) => this.gameLogic(event, selectedCharacter[this.state.randomInt])}>
                {topCharacter.chinese}
              </div>

              <div className="left-character character-box" onClick={(event) => this.gameLogic(event, selectedCharacter[this.state.randomInt])}> 
              {leftCharacter.chinese}
              </div>

              <div className="right-character character-box" onClick={(event) => this.gameLogic(event, selectedCharacter[this.state.randomInt])}>
                {rightCharacter.chinese}
              </div>

            </div>

          :
            
            <div> 
              <h1> Finished! </h1>
              <h2> Your score is {this.state.score}</h2>
            </div> 
          }
          
          {this.state.timer === 1 ? this.postScore() : null}
      </div>
    )
  }
}

export default Game