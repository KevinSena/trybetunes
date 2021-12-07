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

  gettingReq = () => {
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
        <div className="flex m-20 justify-center">
          <div className="flex flex-col mr-10">
            <img src={ result[0].artworkUrl100 } alt={ result[0].collectionName } />
            <h2
              className="text-gray-800 text-md font-bold"
              data-testid="album-name"
            >
              {result[0].collectionName}
            </h2>
            <h3 data-testid="artist-name">{result[0].artistName}</h3>
          </div>
          <div className="flex flex-col">
            {
              result.length > 0 && result.map((e, index) => {
                const { previewUrl, trackName, trackId } = e;
                return (index > 0 && (
                  <MusicCard
                    key={ index }
                    previewUrl={ previewUrl }
                    trackName={ trackName }
                    trackId={ trackId }
                    music={ e }
                  />
                ));
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  location: PropTypes.object,
}.isRequired;

export default withRouter(Album);
