import React, { Component } from 'react'
import NavBar from "./NavBar"

 class Profile extends Component {
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
              <h3> Lifetime Score: 0</h3>

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
