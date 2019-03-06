import React, { Component } from 'react'
import Game from "../components/Game"

const GameContainer = (props) => {

    return (
      <div className="game-page">
            <Game characters={props.characters} user={props.user}/>
      </div>
    )
  }

export default GameContainer;
