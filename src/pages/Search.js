import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      searched: '',
      submited: false,
      result: [''],
    };
  }

  changeHandler = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  searcher = async () => {
    const { search } = this.state;
    const final = await searchAlbumsAPI(search);
    this.setState({
      searched: search,
      search: '',
      submited: false,
      result: final,
    });
  }

  render() {
    const { search, searched, submited, result } = this.state;
    const singerString = 'Resultado de álbuns de: ';
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <input
            name="search"
            type="search"
            placeholder="Nome do Artista"
            data-testid="search-artist-input"
            value={ search }
            onChange={ this.changeHandler }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ search.length < 2 }
            onClick={ () => {
              this.setState({
                submited: true,
              });
              this.searcher();
            } }
          >
            Pesquisar
          </button>
        </div>
        <div>
          { submited && <h1>Carregando...</h1> }
          { result.length > 0 && searched !== '' && (
            <p>
              {singerString}
              {searched}
            </p>
          ) }
          { result.length > 0 ? result
            .map((
              {
                collectionId,
                artworkUrl100,
                collectionName,
                artistName,
              },
              index,
            ) => (
              <Link
                key={ index }
                to={ `/album/${collectionId}` }
                data-testid={ `link-to-album-${collectionId}` }
              >
                <img src={ artworkUrl100 } alt={ collectionName } />
                <h2>{collectionName}</h2>
                <h3>{artistName}</h3>
              </Link>
            ))
            : <p>Nenhum álbum foi encontrado</p>}
        </div>
      </div>
    );
  }
}

export default Search;
