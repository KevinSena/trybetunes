import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCardFav from '../components/MusicCardFav';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      favorited: [],
    };
  }

  componentDidMount() {
    this.gettingReq();
  }

  gettingReq = () => {
    getFavoriteSongs().then((data) => this.setState({
      favorited: data,
    }));
  }

  render() {
    const { favorited } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          (
            favorited.map((obj, index) => {
              const { previewUrl, trackName, trackId } = obj;
              return (
                <MusicCardFav
                  key={ index }
                  previewUrl={ previewUrl }
                  trackName={ trackName }
                  trackId={ trackId }
                  music={ obj }
                />
              );
            }))
        }
      </div>
    );
  }
}

export default Favorites;
