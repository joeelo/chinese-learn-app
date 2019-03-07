import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { withRouter } from "react-router"
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar"
import GameContainer from "./containers/GameContainer";
import FormContainer from "./containers/FormContainer";
import CharacterContainer from './containers/CharacterContainer';

class App extends Component {

  state = {
    characters: [],
    user: {}, 
    searchValue: ""
  }

  componentDidMount = () => {
    this.fetchCharacters();
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token")
      fetch("http://localhost:3001/api/v1/user", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          alert(`${data.message}`)
        } else {
          this.setState({ user: data.user })
        }
      })
    }
  }

  fetchCharacters = () => {
    fetch("http://localhost:3001/api/v1/characters") 
    .then(res => res.json()) 
    .then(chars => this.setState({characters: chars}))
  }

  createUser = (event, obj) => {
    event.preventDefault();
    let name = obj.name
    let email = obj.email
    let password = obj.password
    console.log("email:" ,email, "password:", password)
    return fetch("http://localhost:3001/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      }, 
      body: JSON.stringify({ user: {name: name, email: email, password: password}})
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        user: data.user
      }, () => {localStorage.setItem("token", data.jwt)})
    })

  }

  loginUser = (event, obj) => {
    event.preventDefault();
    return fetch("http://localhost:3001/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ user: obj})
    })
    .then(res => res.json())
    .then(data => { 
      if (data.user) {
        this.setState({
        user: data.user
        }, () => {localStorage.setItem("token", data.jwt)})
      } else {
        alert("invalid username or password!")
      }
    })
    .then(console.log)
  }
  
  searchHandler = (event) => {
    console.log(this.state.searchValue)
    this.setState({
      searchValue: event.target.value
    })
  }

  searchedCharacters = () => {
    let returnedChars = (this.state.characters.filter(char => {
      return char.meaning.includes(this.state.searchValue)
    } ))
    return returnedChars
  }

  
  logOut = () => {
    localStorage.removeItem("token");
    this.setState({
      user: {}
    })
  }
  
  userPresent = () => {
    return Object.keys(this.state.user).length > 0;
  }

  render() {
    return (

      <Router> 
        <div className="App">
            <NavBar loggedIn={this.userPresent()} logOut={this.logOut}/>
            <Switch> 
              <Route exact path="/" render ={(props) => <HomePage loggedIn={this.userPresent}/> } />
              <Route exact path="/login" render={ (props) => <FormContainer props={this.state} createUser={this.createUser} loginUser={this.loginUser}/> } />
              <Route exact path="/characters" render={ (props) => <CharacterContainer characters={this.searchedCharacters()} searchHandler={this.searchHandler} user={this.state.user}/> }/>
              <Route exact path="/profile" render={ (props) => <Profile user={this.state.user} characters={this.state.characters}/> } />
              <Route exact path="/game" render={ (props) =>  <GameContainer characters={this.state.characters} user={this.state.user}/> } />
              <Route exact path="/sign-up" render={ (props) => <FormContainer props={this.state} createUser={this.createUser}/> } />
            </Switch>
        </div>
      </Router>

    );
  }
}

export default withRouter(App);
