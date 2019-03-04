import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import LoginForm from "../components/LoginForm"
import SignUpForm from "../components/SignUpForm"
import NavBar from "../components/NavBar"

class FormContainer extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <div>
          <NavBar />
        </div>
        <div className="login-form-container">
          {this.props.loginUser ?
          
            <LoginForm loginUser={this.props.loginUser}/>

          : 

            <SignUpForm createUser={this.props.createUser}/> 

          }


        </div>
      </div>
    )
  }
}
export default withRouter(FormContainer)