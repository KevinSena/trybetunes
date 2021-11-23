import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      result: [''],
    };
  }

  componentDidMount() {
    this.gettingReq();
  }

  gettingReq = async () => {
    const { location } = this.props;
    const albumId = location.pathname.split('/')[2];
    getMusics(albumId).then((data) => this.setState({
      result: data,
    }));
  }

  render() {
    const { result } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <img src={ result[0].artworkUrl100 } alt={ result[0].collectionName } />
          <h2 data-testid="album-name">{result[0].collectionName}</h2>
          <h3 data-testid="artist-name">{result[0].artistName}</h3>
        </div>
        <div>
          {
            result.length > 0 && result.map(({ previewUrl, trackName }, index) => (
              index > 0 && (
                <MusicCard
                  key={ index }
                  previewUrl={ previewUrl }
                  trackName={ trackName }
                />
              )
            ))
          }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  location: PropTypes.object,
}.isRequired;

export default withRouter(Album);
