import React, { Component } from 'react'
import LikeComponent from "./LikeComponent"
import CharacterCard from "./CharacterCard"

 class Profile extends Component {

  state = {
    scores: [],
    likedChars: []
  }

  componentDidMount = () => {
    this.fetchScores();
    this.fetchLikes();
  }

  fetchScores = () => {
    fetch("http://localhost:3001/api/v1/scores")
    .then(res => res.json())
    .then((scores) => this.setState({
      scores: scores
    }))
  }

  fetchLikes = () => {
    fetch("http://localhost:3001/api/v1/likes")
    .then(res => res.json())
    .then( (likes) => this.setState({
      likedChars: likes
    }))
  }

  myScores = () => {
    return this.state.scores.filter( (score) => {
      return score.user_id === this.props.user.id
    })
  }

  myLikes = () => {
      return this.state.likedChars.filter( (like) => {
        return like.user_id === this.props.user.id
      })
  }


  lifeTimeScore = () => {
    let total = 0;
    this.myScores().map( (score) => total += score.points);
    return total;
  }

  renderLikes = () => {
    let likes = this.myLikes().map( (char) => {
      return <LikeComponent key={char.id} character={char} user={this.props.user} characters={this.myLikes()}/>
    })
    return likes
  }

  render() {
    console.log(this.myLikes())
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
{/* 
        <div className="liked-div">
          {this.renderLikes()}
        </div> */}
      </div>
    )
  }
}

export default Profile;
