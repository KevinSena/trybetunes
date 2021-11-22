import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
    };
  }

  componentDidMount() {
    this.catchUser();
  }

  catchUser = async () => {
    const response = await getUser().then((e) => e.name);
    this.setState({
      name: response,
    });
  }

  render() {
    const { location } = this.props;
    const { name } = this.state;
    const linkStyle = {
      backgroundColor: '#036B52',
      color: 'white',
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
            <img src="./headerLogo.png" alt="branch" />
          </div>
          <div
            className="
            flex
            self-center
            p-2
            rounded-full
            bg-white"
          >
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
          "
        >
          <Link
            style={ location.pathname === '/search' ? linkStyle : {} }
            to="/search"
            data-testid="link-to-search"
            className="
            w-1/3
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
            style={ location.pathname === '/favorites' ? linkStyle : {} }
            to="/favorites"
            data-testid="link-to-favorites"
            className="
            w-1/3
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
            style={ location.pathname === '/profile' ? linkStyle : {} }
            to="/profile"
            data-testid="link-to-profile"
            className="
            w-1/3 text-center
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
