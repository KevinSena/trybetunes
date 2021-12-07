import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';

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
            <img src="https://s3-alpha-sig.figma.com/img/b9aa/b33b/90cfc7e08c97fce6f1d6e8abbfff6e6e?Expires=1639958400&Signature=L4cDiuA1GBv22bUPnWQ1iJZS3UjxUrRM7UU8~3T22u0p~AiTCj1r9a8z0ZTyoG1R4-5vw5gguMdPEGtGXsfQfEi-JgkCUnZNxgk0EHbrAoFJFGE5OYVbD7kdyMf0id0R0x2OZnRiHB9lSMj20hFa7fR21pXHoiAprH8EoRw~5mBJ5YcZIAJ4nJEV6GT0TATJ49QRQISVG-UpXkcIkl7ftf-4OSH0hgpJH5bT-wrtw9VpyOjqC2Sr4reNkyIYcwnks-gcaG9YuVKDVz14kpCYYzj6j5Du-7bNGvROY-b1ES~EweQhZbfyIer6rw~khOnBx0seyzDmMtPrQCyGVY0WVw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="branch" />
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
          "
        >
          <Link
            style={ location.pathname === '/search' ? linkStyle : defaultStyle }
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
            style={ location.pathname === '/favorites' ? linkStyle : defaultStyle }
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
            style={ location.pathname === '/profile' ? linkStyle : defaultStyle }
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
