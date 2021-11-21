import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      submited: false,
    };
  }

  minLength = () => {
    const { name } = this.state;
    const min = 3;
    if (name.length >= min) return false;
    return true;
  }

  changeHandler = ({ target }) => {
    const { value } = target;
    this.setState({
      name: value,
    });
  }

  render() {
    const { name, submited } = this.state;
    const { history } = this.props;
    return (
      <div className="h-screen flex flex-col m-auto" data-testid="page-login">
        <div
          className="
            xl:w-3/5
            lg:w-4/5
            w-full
            mx-auto
            my-10
            flex
            flex-col
            items-center"
        >
          {
            submited ? <h1 className="mt-40 text-4xl">Carregando...</h1>
              : (
                <>
                  <img src="./logo.png" alt="trybe tunes" className="w-60 mb-20" />
                  <div className="w-3/4 shadow-xl p-5 sm:p-20 rounded-xl border">
                    <input
                      name="name"
                      className="
                    mb-5
                    w-full
                    border
                    border-gray-400
                    rounded
                    p-2
                    focus:outline-none"
                      type="text"
                      placeholder="Nome"
                      data-testid="login-name-input"
                      onChange={ this.changeHandler }
                    />
                    <button
                      type="button"
                      className="
                      w-full
                      bg-blue-800
                      text-white
                      py-2
                      rounded"
                      data-testid="login-submit-button"
                      disabled={ this.minLength() }
                      onClick={ () => {
                        this.setState({
                          submited: true,
                        });
                        createUser({ name }).then(() => history.push('/search'));
                      } }
                    >
                      Enviar
                    </button>
                  </div>
                </>
              )
          }
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Login;
