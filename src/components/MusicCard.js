import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      submited: false,
    };
  }

  render() {
    const { previewUrl, trackName, trackId, music } = this.props;
    const { submited } = this.state;
    return (
      <div className="flex">
        <p className="self-center">{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor={ trackId }>
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id={ trackId }
            onClick={ async () => {
              this.setState({
                submited: true,
              });
              await addSong(music);
              this.setState({
                submited: false,
              });
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
