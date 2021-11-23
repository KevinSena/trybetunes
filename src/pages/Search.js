import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
    };
  }

  changeHandler = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { search } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <input
            name="search"
            type="search"
            placeholder="Nome do Album"
            data-testid="search-artist-input"
            value={ search }
            onChange={ this.changeHandler }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ search.length < 2 }
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
