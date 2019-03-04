import React, { Component } from 'react'

class SearchForm extends Component {

  state = {
    searchValue: ""
  }

  changeSearchValue = (event) => {
    event.persist();
    this.setState((prevState) => ({
      searchValue: event.target.value
    }))
  }

  handlers = (event) => {
    this.changeSearchValue(event);
    this.props.searchHandler(event);
  }

  render() {
    return (
      <div className="search-form">
        <form>
          <label>Search: </label>
          <input type="text" onChange={this.handlers} /> 
        </form> 
      </div>
    )
  }
}

export default SearchForm