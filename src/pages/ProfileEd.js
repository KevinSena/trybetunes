import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      loadText: 'Carregando...',
      disabled: true,
    };
  }

  componentDidMount() {
    this.catchUser();
  }

  catchUser = () => {
    getUser().then(({ name, email, image, description }) => (
      this.setState({
        name,
        email,
        image,
        description,
        loadText: '',
      })
    ));
  }

  validate = () => {
    const { name, email, image, description } = this.state;
    const content = (name !== '' && image !== '' && description !== '');
    const emailPiece = email.split('@');
    const includA = emailPiece.length === 2;
    const isValidEmail = email.endsWith('.com');
    return !(content && includA && isValidEmail);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      disabled: this.validate(),
    });
  }

  render() {
    const { name, email, image, description, loadText, disabled } = this.state;
    const { history } = this.props;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          loadText === '' ? (
            <form className="flex flex-col mx-auto my-20 w-1/3">
              <div className="flex justify-around">
                {
                  image === '' ? (
                    <i
                      className="
                      fas
                      fa-user
                      text-white
                      p-6
                      text-6xl
                      bg-gray-600
                      rounded-full
                      self-center"
                    />
                  ) : (
                    <img
                      src={ image }
                      alt={ name }
                      data-testid="profile-image"
                      className="
                      w-40
                      p-6
                      text-6xl
                      rounded-full
                      self-center"
                    />
                  )
                }
                <input
                  name="image"
                  onChange={ this.handleChange }
                  value={ image }
                  type="text"
                  placeholder="Insira um link"
                  data-testid="edit-input-image"
                  className="
                  self-center"
                />
              </div>

              <div className="flex flex-col mx-auto">
                <h3 className="mt-10">Nome:</h3>
                <input
                  name="name"
                  onChange={ this.handleChange }
                  value={ name }
                  type="text"
                  data-testid="edit-input-name"
                />

                <h3 className="mt-10">Email:</h3>
                <input
                  name="email"
                  onChange={ this.handleChange }
                  value={ email }
                  type="email"
                  data-testid="edit-input-email"
                />

                <h3 className="mt-10">Descrição:</h3>
                <textarea
                  name="description"
                  onChange={ this.handleChange }
                  value={ description }
                  data-testid="edit-input-description"
                />
              </div>

              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ disabled }
                className="
                bg-blue-600
                text-white
                p-2
                w-40
                mx-auto"
                onClick={ () => updateUser({ name, email, image, description })
                  .then(() => history.push('/profile')) }
              >
                Editar perfil
              </button>
            </form>
          ) : (
            <h1>{ loadText }</h1>
          )
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default ProfileEdit;
