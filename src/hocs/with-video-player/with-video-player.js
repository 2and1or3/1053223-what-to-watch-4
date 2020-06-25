import React from "react";
import {PureComponent} from "react";

import VideoPlayer from '../../components/video-player/video-player.jsx';


const PREVIEW_DELAY = 1000;

const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
      };

      this._handleCardHover = this._handleCardHover.bind(this);
      this._handleCardLeave = this._handleCardLeave.bind(this);
    }

    _handleCardHover() {
      this._timerId = setTimeout(() => {
        this.setState({isPlaying: true});
      }, PREVIEW_DELAY);
    }

    _handleCardLeave() {
      clearTimeout(this._timerId);
      this.setState({isPlaying: false});
    }

    render() {
      return (
        <Component
          {...this.props}
          renderPlayer = {(film, isMuted) => {
            return <VideoPlayer film = {film} isPlaying = {this.state.isPlaying} isMuted = {isMuted}/>;
          }}
          onCardHover = {this._handleCardHover}
          onCardLeave = {this._handleCardLeave}
        />);
    }
  }

  WithVideoPlayer.propTypes = {};

  return WithVideoPlayer;
};

export default withVideoPlayer;
