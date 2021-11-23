import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      submited: false,
      favorited: false,
    };
  }

  componentDidMount() {
    this.favoriitedSongs();
  }

  favoriitedSongs = () => {
    const { trackId } = this.props;
    this.setState({
      submited: true,
    });
    getFavoriteSongs().then((included) => this.setState({
      submited: false,
      favorited: included.some((e) => e.trackId === trackId),
    }));
  }

  render() {
    const { previewUrl, trackName, trackId, music } = this.props;
    const { submited, favorited } = this.state;
    return (
      <div className="flex">
        <p className="self-center">{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor={ trackId }>
          <input
            checked={ favorited }
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id={ trackId }
            onChange={ this.favoriitedSongs }
            onClick={ () => {
              this.setState({
                submited: true,
              });
              addSong(music).then(() => this.setState({
                submited: false,
              }));
            } }
          />
          { submited ? 'Carregando...' : 'Favorita' }
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
  trackId: PropTypes.string,
  music: PropTypes.object,
}.isRequired;

export default MusicCard;
