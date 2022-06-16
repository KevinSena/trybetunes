import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
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
        <div className="flex flex-wrap sm:flex-nowrap w-3/5 my-20 mx-auto">
          <input
            name="search"
            type="search"
            placeholder="Nome do Artista"
            data-testid="search-artist-input"
            className="
            focus:outline-none
            w-full
            sm:w-4/5
            border
            rounded
            p-2
            font-lg
            border-gray-600"
            value={ search }
            onChange={ this.changeHandler }
          />
          <button
            className="
            bg-blue-600
            text-white
            p-2
            w-full
            my-2
            sm:w-1/5
            sm:my-0
            sm:ml-2"
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
        <div className="mx-20">
          { submited && <Loading /> }
          { result.length > 0 && searched !== '' && (
            <p className="text-2xl">
              {singerString}
              {searched}
            </p>
          ) }
          <div className="flex flex-wrap my-6 justify-around">
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
                  className="
                  rounded-xl
                  bg-white
                  shadow-xl
                  flex
                  flex-col
                  w-60
                  p-1
                  m-4"
                  key={ index }
                  to={ `/album/${collectionId}` }
                  data-testid={ `link-to-album-${collectionId}` }
                >
                  <img src={ artworkUrl100 } alt={ collectionName } />
                  <h2 className="text-gray-800 text-md font-bold">{collectionName}</h2>
                  <h3>{artistName}</h3>
                </Link>
              ))
              : <p>Nenhum álbum foi encontrado</p>}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
