import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';
import logo from '../assets/headerLogo.png';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      image: '',
    };
  }

  componentDidMount() {
    this.catchUser();
  }

  catchUser = async () => {
    const response = await getUser();
    this.setState({
      name: response.name,
      image: response.image,
    });
  }

  render() {
    const { location } = this.props;
    const { name, image } = this.state;
    const linkStyle = {
      backgroundColor: '#036B52',
      color: 'white',
    };
    const defaultStyle = {
      backgroundColor: '#F0F2F5',
    };

    return (
      <header className="flex flex-col w-full" data-testid="header-component">
        <div
          className="
          bg-green-900
          flex
          justify-between
          pt-0
          px-4
          w-full"
        >
          <div className="w-28">
            <img src={ logo } alt="branch" />
          </div>
          <div
            className="
            flex
            self-center
            p-2
            rounded-full
            bg-white"
          >
            {
              image === '' ? (
                <i
                  className="
                  fas
                  fa-user
                  text-white
                  p-2
                  bg-green-600
                  rounded-full
                  self-center
                  mr-2"
                />
              ) : (
                <img
                  src={ image }
                  alt={ name }
                  className="
                  w-10
                  h-10
                  mr-2
                  rounded-full
                  self-center"
                />
              )
            }
            {
              name === '' ? <p className="self-center">Carregando...</p>
                : (
                  <p data-testid="header-user-name" className="self-center">
                    {name}
                  </p>
                )
            }
          </div>
        </div>
        <div
          className="
          flex
          flex-wrap
          "
        >
          <Link
            style={ location.pathname === '/search' ? linkStyle : defaultStyle }
            to="/search"
            data-testid="link-to-search"
            className="
            w-full
            sm:w-1/3
            text-center
            p-4
            text-3xl
            font-bold
            text-green-600
            bg-gray-200
            "
          >
            Pesquisa
          </Link>
          <Link
            style={ location.pathname === '/favorites' ? linkStyle : defaultStyle }
            to="/favorites"
            data-testid="link-to-favorites"
            className="
            w-full
            sm:w-1/3
            text-center
            p-4
            text-3xl
            font-bold
            text-green-600
            bg-gray-200"
          >
            Favoritas
          </Link>
          <Link
            style={ location.pathname === '/profile' ? linkStyle : defaultStyle }
            to="/profile"
            data-testid="link-to-profile"
            className="
            w-full
            sm:w-1/3 text-center
            p-4
            text-3xl
            font-bold
            text-green-600
            bg-gray-200"
          >
            Perfil
          </Link>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  location: PropTypes.object,
}.isRequired;

export default withRouter(Header);
