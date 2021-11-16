import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Search from './pages/Search';
import HomeLogin from './pages/Login';
import AlbumId from './pages/Album';
import FavoritesSongs from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEd';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ AlbumId } />
          <Route path="/favorites" component={ FavoritesSongs } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="/" component={ HomeLogin } />
          <Route path="/*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
