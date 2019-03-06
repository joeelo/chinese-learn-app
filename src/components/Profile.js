import React, { Component } from 'react'

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

  myScores = () => {
    return this.state.scores.filter( (score) => {
      return score.user_id === this.props.user.id
    })
  }

  lifeTimeScore = () => {
    let total = 0;
    this.myScores().map( (score) => total += score.points);
    return total;
  }

  render() {
    console.log(this.myScores())
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-left">
            <div className="profile-picture-container">
              <div className="user-image">
                {/* <img alt="" src=""/>  */}
              </div>
            </div>
            <div className="user-info">
              <h1> {this.props.user.name} </h1>
              <h3> Level: Novice</h3>
              <h3> Points: {this.lifeTimeScore()} </h3>

            </div>
          </div>
          

          <div className="profile-right">
            <h1 className="profile-quote"> When I let go of what I am, I become what I might be. <br/> -Lao Tzu </h1>
          </div>
        </div>


      </div>
    )
  }
}

export default Profile;
