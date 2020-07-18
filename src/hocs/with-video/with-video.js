import React from "react";
import PropTypes from "prop-types";
import {PureComponent} from "react";

import {filmProp} from '../../props.js';

const getLeftfromElement = (evt, element) =>{
  return evt.clientX - element.getBoundingClientRect().x;
};

const getTogglerPositionInPercent = (xPosition, parent) => {
  const frac = +(xPosition / parent.offsetWidth).toFixed(2);
  return Math.trunc(frac * 100);
};

const getProgressInSeconds = (togglerPositionInPercent, fullTime) => {
  return Math.round((togglerPositionInPercent * fullTime) / 100);
};

const getProgressInPercent = (progress, fullTime) => {
  return Math.round((progress / fullTime) * 100);
};

const withVideo = (Component) => {
  class WithVideo extends PureComponent {
    constructor(props) {
      super(props);
      this._videoRef = React.createRef();
      this._containerRef = React.createRef();
      this._progressRef = React.createRef();

      this.state = {
        isPlaying: this.props.isPlaying,
        isLoading: true,
        progress: 0,
        togglerPosition: 0,
      };

      this._handlePlayClick = this._handlePlayClick.bind(this);
      this._handleFullScreen = this._handleFullScreen.bind(this);
      this._handleToggleMove = this._handleToggleMove.bind(this);

      this._videoElement = <video ref={this._videoRef} width="280" height="175" className="player__video"/>;
    }

    componentDidMount() {
      const {currentFilm, isMuted} = this.props;
      const {preview, poster, duration} = currentFilm;
      const video = this._videoRef.current;

      video.poster = poster;
      video.src = preview;

      if (this.props.isPlaying) {
        video.oncanplaythrough = () => this.setState({isLoading: false});
      }

      video.ontimeupdate = () => {
        const progressInPercent = getProgressInPercent(Math.floor(video.currentTime), duration);
        const nextState = {
          progress: progressInPercent,
          togglerPosition: progressInPercent,
        };

        this.setState(nextState);
      };


      video.onplay = () => this.setState({isPlaying: true});
      video.onpause = () => this.setState({isPlaying: false});

      video.muted = isMuted;
    }

    componentDidUpdate() {
      const video = this._videoRef.current;

      if (this.props.isMuted) {
        if (this.props.isPlaying) {
          video.play();
        } else {
          video.load();
        }
      } else {
        if (this.state.isPlaying) {
          video.play();
        } else {
          video.pause();
        }
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;
      video.oncanplaythrough = null;
      video.onplay = null;
      video.onpause = null;
      video.poster = null;
      video.ontimeupdate = null;
      video.src = null;
    }

    _handlePlayClick() {
      this.setState((state) => ({
        isPlaying: !state.isPlaying,
      }));
    }

    _handleFullScreen() {
      const container = this._containerRef.current;

      if (!document.fullscreenElement) {
        container.requestFullscreen()
        .catch((err) => {
          throw new Error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
      } else {
        document.exitFullscreen();
      }
    }

    _handleToggleMove(downEvt) {
      const progressElement = this._progressRef.current;
      const video = this._videoRef.current;
      const {currentFilm} = this.props;
      const {duration} = currentFilm;

      const handleMove = (moveEvt) => {
        const currentTogglerPosition = getLeftfromElement(moveEvt, progressElement);
        const currentTogglerPositionInPercent = getTogglerPositionInPercent(currentTogglerPosition, progressElement);


        this.setState({isPlaying: false});

        const nextState = {
          togglerPosition: currentTogglerPositionInPercent,
          progress: currentTogglerPositionInPercent,
        };

        setTimeout(() => {
          this.setState(nextState);
        }, 0);
      };

      const handleUp = (upEvt) => {
        const currentTogglerPosition = getLeftfromElement(upEvt, progressElement);
        const currentTogglerPositionInPercent = getTogglerPositionInPercent(currentTogglerPosition, progressElement);

        const nextState = {
          togglerPosition: currentTogglerPositionInPercent,
          progress: currentTogglerPositionInPercent,
        };

        video.currentTime = getProgressInSeconds(this.state.progress, duration);

        this.setState(nextState);
        setTimeout(() => {
          this.setState({isPlaying: true});
        }, 0);

        window.removeEventListener(`mousemove`, handleMove);
        window.removeEventListener(`mouseup`, handleUp);
      };

      handleMove(downEvt);

      window.addEventListener(`mousemove`, handleMove);
      window.addEventListener(`mouseup`, handleUp);
    }

    render() {
      const {progress, isPlaying, togglerPosition} = this.state;

      return (
        <Component
          {...this.props}
          onPlayClick = {this._handlePlayClick}
          progress = {progress}
          isPlaying = {isPlaying}
          onFullScreen = {this._handleFullScreen}
          containerRef = {this._containerRef}
          progressRef = {this._progressRef}
          onToggleMove = {this._handleToggleMove}
          togglerPosition = {togglerPosition}
        >
          {this._videoElement}
        </Component>
      );
    }
  }

  WithVideo.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    currentFilm: filmProp,
    isMuted: PropTypes.bool.isRequired,
  };

  return WithVideo;
};

export default withVideo;
