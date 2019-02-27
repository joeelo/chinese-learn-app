import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom"

class NavBar extends Component {
  render() {
    return (

      <div>

        <nav>

          <div className="nav-left">
            <button className="nav-button"> <Link to="/"> Home </Link> </button>
            <button className="nav-button"> <Link to="/profile"> Profile </Link> </button>
            <button className="nav-button"> <Link to="/game"> Play! </Link> </button>
          </div>

          <div className="nav-right">
            <button> <Link to="/login"> Login </Link></button>
            <button> <Link to="sign-up"> Sign Up </Link></button>
          </div>

        </nav>
        
      </div>
    )
  }
}

export default withRouter(NavBar);
