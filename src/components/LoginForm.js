import React, { Component } from 'react';
import { withRouter} from "react-router-dom";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",   
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div className="login-form">
      <h1> Login </h1> 
        <form id="login-form" onSubmit={(event) => {
          this.props.loginUser(event, this.state)
          .then(() => this.props.history.push("/"))
        }}>
          <label>Email  </label> 

          <br/>

          <input 
            onChange={this.changeHandler}
            value={this.state.email} 
            id="email-input" 
            type="text" 
            name="email"
          />

          <br/>

          <label>Password </label> 

          <br/>

          <input 
            onChange={this.changeHandler}
            value={this.state.password} 
            type="password" 
            name="password"
          /> 

          <br/>

          <input type="submit" value={"Log In"}/>
        </form>
      </div>
    )
  }
}
export default withRouter(LoginForm)