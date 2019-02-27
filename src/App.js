import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router } from "react-router-dom"
import { Route, Switch } from 'react-router-dom';
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import GameContainer from "./containers/GameContainer";
import FormContainer from "./containers/FormContainer";

class App extends Component {

  state = {
    characters: [],
    user: {}
  }

  componentDidMount = () => {
    this.fetchCharacters();
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token")
      fetch("http://localhost:3001/api/v1/user", {
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json",
          Authorization: `${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          alert(`${data.message}`)
        } else {
          this.setState({ user: data.user }, () => this.props.history.push("/"))
        }
      })
      .then(console.log)
    }
  }

  fetchCharacters = () => {
    fetch("http://localhost:3001/api/v1/characters") 
    .then(res => res.json()) 
    .then(chars => this.setState({characters: chars}))
  }

  loginUser = (event, obj) => {

  }

  createUser = (event, obj) => {
    event.preventDefault();
    let email = obj.email
    let password = obj.password
    console.log("email:" ,email, "password:", password)
    fetch("http://localhost:3001/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      }, 
      body: JSON.stringify({ user: { email: email, password: password}})
    })
    .then(res => res.json())
    .then(console.log) 
  }
  
  render() {
    return (

      <Router> 
        <div className="App">

            <Switch> 
              <Route exact path="/" render={ (props) => <HomePage props={props}/> } />
              <Route exact path="/login" render={ (props) => <FormContainer props={this.state} createUser={this.createUser} loginUser={this.loginUser}/> } />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/game" render={ (props) =>  <GameContainer characters={this.state.characters}/> } />
              <Route exact path="/sign-up" render={ (props) => <FormContainer props={this.state} createsUser={this.createUser}/> } />
            </Switch>
        </div>
      </Router>

    );
  }
}

export default App;
