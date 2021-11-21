import React, { Component } from 'react';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
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
    const { name } = this.state;
    return (
      <header className="flex w-full" data-testid="header-component">
        {
          name === '' ? <p>Carregando...</p>
            : (
              <>
                <p>My Header</p>
                <div data-testid="header-user-name">{name}</div>
              </>
            )
        }
      </header>
    );
  }
}
