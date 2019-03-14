/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react'
import CharacterCard from "./CharacterCard"

 class Profile extends Component {

  state = {
    scores: [],
    likedChars: []
  }

  componentDidMount = () => {
    this.fetchMyLikes();
    this.fetchMyScores();
  }

  fetchMyScores = () => {
    return fetch(`http://localhost:3001/api/v1/user/${this.props.user.id}/scores`)
    .then(res => res.json())
    .then(myScores => this.setState({
      scores: myScores
    }))

  }

  fetchMyLikes = () => {
    fetch(`http://localhost:3001/api/v1/user/${this.props.user.id}/likes`)
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

  lifeTimeScore = () => {
    let total = 0;
    this.myScores().map( (score) => total += score.points);
    return total;
  }

  removeLikeHandler = (characterId) => {
    let newArr = this.state.likedChars.filter((char) => char.id !== characterId)
    this.setState({
      likedChars: newArr
    })
  }

  renderLikes = () => {
    let liked = this.state.likedChars.map( (char, index) => {
      return <CharacterCard key={index} character={char} user={this.props.user} renderedBy={true} removeLikeHandler={this.removeLikeHandler}/>
    })
    return liked
  }

  myLevel = () => {
    let obj = {}
    let score = this.lifeTimeScore();
    const level1 = 0;
    const level2 = 1000;
    const level3 = 5000;
    const level4 = 15000;
    if (score >= level1 && score < level2) {
      obj = {level: "Novice", img: "https://chinesecalligraphystore.com/free-chinese-symbols/chinese-symbol-pictures/chinese-symbol-for-water.gif"};

    } else if( score >= level2 && score < level3) {
      obj = {level: "Practitioner", img: "https://2.bp.blogspot.com/-riL9SCFJjaY/WARqQOnl0oI/AAAAAAAAETc/oseIhb70eKkcM5O5U-_9ZYismNxANDhjACEw/s1600/iBmuFsbjtczsqqh.jpg"};

    } else if( score >= level3 && score < level4) {
      obj = {level: "Dedicated Learner", img: "https://chinesecalligraphystore.com/free-chinese-symbols/chinese-symbol-pictures-medium/chinese-symbol-for-fire.gif"};

    } else if( score >= level4 ) {
      obj = {level: "Master of the Cards", img: "http://icon-park.com/imagefiles/kanji_ten_heaven_sky.png"};
    }
    return obj;
  }


  render() {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-left">
            <div className="profile-picture-container">
              <div className="user-image">
                <img alt="profile-image" src={this.myLevel()["img"]}/> 
              </div>
            </div>
            <div className="user-info">
              <h1> {this.props.user.name} </h1>
              <h3> Level: {this.myLevel()["level"]}</h3>
              <h3> Points: {this.lifeTimeScore()} </h3>

            </div>
          </div>
          

          <div className="profile-right">
            <h1 className="profile-quote"> When I let go of what I am, I become what I might be. <br/> -Lao Tzu </h1>
          </div>
        </div>

         <div className="liked-div">
           {this.renderLikes()}
         </div>
      </div>
    )
  }
}

export default Profile;
