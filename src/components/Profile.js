import React, { Component } from 'react'
import NavBar from "./NavBar"

 class Profile extends Component {

  state = {
    scores: []
  }

  componentDidMount = () => {
    this.fetchScores();
  }

  fetchScores = () => {
    fetch("http://localhost:3001/api/v1/scores")
    .then(res => res.json())
    .then((scores) => this.setState({
      scores: scores
    }))
  }

  lifeTimeScore = () => {
    let total = 0;
    this.state.scores.map( (score) => total += score.points);
    return total;
  }

  render() {
    return (
      <div className="profile-page">
        <NavBar />
        <div className="profile-container">
          <div className="profile-left">
            <div className="profile-picture-container">
              <div className="user-image">
                {/* <img/> */}
              </div>
            </div>
            <div className="user-info">
              <h1> Joseph Lorenzo </h1>
              <h3> Level: Novice</h3>
              <h3> Points: {this.lifeTimeScore()}</h3>

            </div>
          </div>
          

          <div className="profile-right">
            {/* Favorite Characters Will go here */}
          </div>
        </div>


      </div>
    )
  }
}

export default Profile;
