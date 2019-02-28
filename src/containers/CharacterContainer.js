import React, { Component } from 'react'
import CharacterCard from "../components/CharacterCard"
import NavBar from "../components/NavBar"
import { withRouter } from "react-router-dom"
import SearchForm from '../components/SearchForm';

class CharacterContainer extends Component {
  
  renderCharacters = () => {
    return this.props.characters.map(char => <CharacterCard key={char.id} character={char}/>)
  }
  
  render() {


    return (

      <div>
        <div>
          <NavBar />
          <SearchForm />
        </div>
        <div className="card-container">
          {this.renderCharacters()}
        </div>
      </div>
    )
  }
}

export default withRouter(CharacterContainer)