import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      submited: false,
      favorited: false,
    };
  }

  componentDidMount() {
    this.favoritedSongs();
  }

  favoritedSongs = () => {
    const { trackId } = this.props;
    getFavoriteSongs().then((included) => this.setState({
      favorited: included && included.some((e) => e.trackId === trackId),
    }));
  }

  render() {
    const { previewUrl, trackName, trackId, music } = this.props;
    const { submited, favorited } = this.state;
    return (
      <div className="flex flex-col sm:flex-row justify-between border-t-2 pt-2 mt-4">
        <p className="sm:self-center sm:w-24">{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label className="sm:self-center" htmlFor={ trackId }>
          <input
            checked={ favorited }
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id={ trackId }
            onChange={ this.favoritedSongs }
            onClick={ () => {
              this.setState({
                submited: true,
              });
              (favorited ? removeSong(music).then(() => this.setState({
                submited: false,
                favorited: false,
              }))
                : addSong(music)).then(() => this.setState({
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
