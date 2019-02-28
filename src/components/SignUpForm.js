import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class SignUpForm extends Component {
  
  state = {
    email: "",
    password: "" 
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    
    return (
      <div className="login-form">
        <h1> Sign Up </h1>
        <form id="sign-up-form" onSubmit={ (event, obj) => this.props.createUser(event, this.state)} >
          <label>Email:  </label> 

          <br/>

          <input 
            onChange={this.changeHandler}
            value={this.state.email} 
            id="email-input" 
            type="text" 
            name="email"
          />

          <br/>

          <label>Password: </label> 

          <br/>

          <input 
            onChange={this.changeHandler}
            value={this.state.password} 
            type="password" 
            name="password"
          /> 

          <br/>

          <input type="submit" value="Sign In"/> 
        </form>
      </div>
    )
  }
}
export default withRouter(SignUpForm)