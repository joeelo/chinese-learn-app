import React, { Component } from 'react'
import Game from "../components/Game"
import NavBar from "../components/NavBar"

const GameContainer = (props) => {

    return (
      <div className="game-page">
            <NavBar/>
            <Game characters={props.characters}/>
      </div>
    )
  }

export default GameContainer;
