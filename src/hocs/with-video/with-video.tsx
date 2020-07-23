import * as React from "react";
import {Subtract} from "utility-types";

import {FilmType} from '../../types';

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

const getProgressInPercent = (progress: number, fullTime: number) => {
  return Math.round((progress / fullTime) * 100);
};

interface State {
  isPlaying: boolean;
  isLoading: boolean;
  progress: number;
  togglerPosition: number;
}

interface Props {
  isPlaying: boolean;
  currentFilm: FilmType;
  isMuted: boolean;
}

interface InjectedProps {
  onPlayClick: () => void;
  progress: number;
  isPlaying: boolean;
  onFullScreen: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
  progressRef: React.RefObject<HTMLProgressElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
  onToggleMove: (downEvt: React.SyntheticEvent) => void;
  togglerPosition: number;
  children: React.ReactNode;
}

const withVideo = (Component) => {
  type WrappedComponentProps = React.ComponentProps<typeof Component>;

  type Self = Props & Subtract<WrappedComponentProps, InjectedProps>

  class WithVideo extends React.PureComponent<Self, State> {
    private videoRef: React.RefObject<HTMLVideoElement>;
    private containerRef: React.RefObject<HTMLDivElement>;
    private progressRef: React.RefObject<HTMLProgressElement>;
    private videoElement: React.ReactNode;

    constructor(props) {
      super(props);
      this.videoRef = React.createRef();
      this.containerRef = React.createRef();
      this.progressRef = React.createRef();

      this.state = {
        isPlaying: this.props.isPlaying,
        isLoading: true,
        progress: 0,
        togglerPosition: 0,
      };

      this._handlePlayClick = this._handlePlayClick.bind(this);
      this._handleFullScreen = this._handleFullScreen.bind(this);
      this._handleToggleMove = this._handleToggleMove.bind(this);

      this.videoElement = <video ref={this.videoRef} width="280" height="175" className="player__video"/>;
    }

    componentDidMount() {
      const {currentFilm, isMuted} = this.props;
      const {preview, poster} = currentFilm;
      const video = this.videoRef.current;

      video.poster = poster;
      video.src = preview;

      video.onplay = () => this.setState({isPlaying: true});
      video.onpause = () => this.setState({isPlaying: false});

      video.muted = isMuted;

      if (this.props.isPlaying) {
        video.oncanplaythrough = () => this.setState({isLoading: false});
      }

      video.ontimeupdate = () => {
        const duration = Math.trunc(video.duration);

        const progressInPercent = getProgressInPercent(Math.floor(video.currentTime), duration);
        const progressInSeconds = getProgressInSeconds(progressInPercent, duration);

        const nextState = {
          progress: progressInSeconds,
          togglerPosition: progressInPercent,
        };

        this.setState(nextState);
      };
    }

    componentDidUpdate() {
      const video = this.videoRef.current;

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
      const video = this.videoRef.current;
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
      const container = this.containerRef.current;

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
      const progressElement = this.progressRef.current;
      const video = this.videoRef.current;

      const duration = Math.trunc(video.duration);

      const handleMove = (moveEvt) => {
        const currentTogglerPosition = getLeftfromElement(moveEvt, progressElement);
        const currentTogglerPositionInPercent = getTogglerPositionInPercent(currentTogglerPosition, progressElement);
        const progressInSeconds = getProgressInSeconds(currentTogglerPositionInPercent, duration);


        this.setState({isPlaying: false});

        const nextState = {
          togglerPosition: progressInSeconds,
          progress: currentTogglerPositionInPercent,
        };

        setTimeout(() => {
          this.setState(nextState);
        }, 0);
      };

      const handleUp = (upEvt) => {
        const currentTogglerPosition = getLeftfromElement(upEvt, progressElement);
        const currentTogglerPositionInPercent = getTogglerPositionInPercent(currentTogglerPosition, progressElement);
        const progressInSeconds = getProgressInSeconds(currentTogglerPositionInPercent, duration);

        const nextState = {
          togglerPosition: currentTogglerPositionInPercent,
          progress: progressInSeconds,
        };

        video.currentTime = progressInSeconds;

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
          containerRef = {this.containerRef}
          progressRef = {this.progressRef}
          videoRef = {this.videoRef}
          onToggleMove = {this._handleToggleMove}
          togglerPosition = {togglerPosition}
        >
          {this.videoElement}
        </Component>
      );
    }
  }

  return WithVideo;
};

export default withVideo;
