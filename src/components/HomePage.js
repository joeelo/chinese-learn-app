import React, { Component } from 'react'
import NavBar from "./NavBar"

export default class HomePage extends Component {
  render() {
    return (
      <div className="home-page">
        <NavBar />
        <img className="home-page-image" alt="laoShi-vertical" src="/images/laoshi_verticleV2.svg"/>
      </div>
    )
  }
}

