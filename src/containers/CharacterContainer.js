import React, { Component } from 'react'
import CharacterCard from "../components/CharacterCard"
import { withRouter } from "react-router-dom"
import SearchForm from '../components/SearchForm';

class CharacterContainer extends Component {
  
  renderCharacters = () => {
    return this.props.characters.map(char => <CharacterCard key={char.id} character={char} user={this.props.user}/>)
  }
  
  render() {


    return (

      <div>
        <div>
          <SearchForm searchHandler={this.props.searchHandler}/>
        </div>
        <div className="card-container">
          {this.renderCharacters()}
        </div>
      </div>
    )
  }
}

export default withRouter(CharacterContainer)