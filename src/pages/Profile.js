import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      loadText: 'Carregando...',
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

  render() {
    const { name, email, image, description, loadText } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <div className="flex flex-col mx-auto my-20 w-1/3">
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
                  p-6
                  text-6xl
                  rounded-full
                  self-center"
                />
              )
            }
            <Link
              to="/profile/edit"
              className="
              self-center"
            >
              Editar perfil
            </Link>
          </div>
          <div className="flex flex-col">
            <h3>Nome:</h3>
            <p>
              { name === '' ? loadText : name }
            </p>
            <h3>Email:</h3>
            <p>
              { email === '' ? loadText : email }
            </p>
            <h3>Descrição:</h3>
            <p>
              { description === '' ? loadText : description }
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
