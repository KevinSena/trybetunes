import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

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
                      h-40
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
                  self-center
                  border-2
                  border-gray-300
                  py-2
                  px-4
                  rounded"
                />
              </div>

              <div className="flex flex-col mx-auto">
                <h3 className="mt-10 font-black text-gray-800">Nome:</h3>
                <input
                  name="name"
                  onChange={ this.handleChange }
                  value={ name }
                  type="text"
                  data-testid="edit-input-name"
                  className="
                  focus:bg-gray-200
                  border-b-2
                  border-gray-500
                  py-2
                  px-4
                  outline-none"
                />

                <h3 className="mt-10 font-black text-gray-800">Email:</h3>
                <input
                  name="email"
                  onChange={ this.handleChange }
                  value={ email }
                  type="email"
                  data-testid="edit-input-email"
                  className="
                  focus:bg-gray-200
                  border-b-2
                  border-gray-500
                  py-2
                  px-4
                  outline-none"
                />

                <h3 className="mt-10 font-black text-gray-800">Descrição:</h3>
                <textarea
                  name="description"
                  onChange={ this.handleChange }
                  value={ description }
                  data-testid="edit-input-description"
                  className="
                  focus:bg-gray-200
                  border-b-2
                  border-gray-500
                  py-2
                  px-4
                  mb-6
                  outline-none"
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
                onClick={ async () => {
                  await updateUser({ name, email, image, description });
                  history.push('/profile');
                } }
              >
                Editar perfil
              </button>
            </form>
          ) : <Loading />
        }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default ProfileEdit;
