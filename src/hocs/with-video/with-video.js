import React from "react";
import PropTypes from "prop-types";
import {PureComponent} from "react";

import {filmProp} from '../../props.js';


const withVideo = (Component) => {
  class WithVideo extends PureComponent {
    constructor(props) {
      super(props);
      this._videoRef = React.createRef();

      this.state = {
        isPlaying: this.props.isPlaying,
        isLoading: true,
      };
    }

    componentDidMount() {
      const {film, isMuted} = this.props;
      const {preview, poster} = film;
      const video = this._videoRef.current;

      video.poster = poster;
      video.src = preview;

      video.onplaythrough = () => this.setState({isLoading: false});

      video.onplay = () => this.setState({isPlaying: true});
      video.onpause = () => this.setState({isPlaying: false});

      video.muted = isMuted;
    }

    componentDidUpdate() {
      const video = this._videoRef.current;

      if (this.props.isPlaying) {
        video.play();
      } else {
        video.pause();
        video.load();
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.onplaythrough = null;
      video.onplay = null;
      video.onpause = null;
      video.poster = null;
      video.src = null;
    }

    render() {

      return (
        <Component {...this.props}>
          {<video ref={this._videoRef} width="280" height="175"/>}
        </Component>
      );
    }
  }

  WithVideo.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    film: filmProp,
    isMuted: PropTypes.bool.isRequired,
  };

  return WithVideo;
};

export default withVideo;
