import React from "react";
import PropTypes from "prop-types";

import {filmProp, refProp} from '../../props.js';
import history from '../../history.js';
import {AppRoute} from '../../consts.js';
import {getWatchTimeFormat} from '../../utils.js';

const PlayerScreen = (props) => {
  const {
    currentFilm,
    children,
    onPlayClick,
    progress,
    isPlaying,
    onFullScreen,
    containerRef,
    progressRef,
    onToggleMove,
    togglerPosition} = props;

  const {duration} = currentFilm;
  const durationInSeconds = duration * 60;
  const timeToWatch = getWatchTimeFormat(durationInSeconds - progress);

  const playControl = isPlaying ? <>
      <svg viewBox="0 0 14 21" width="14" height="21">
        <use xlinkHref="#pause"></use>
      </svg>
      <span>Pause</span>
    </> : <>
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </>;

  return (
    <div className="player" ref={containerRef}>
      {children}

      <button type="button" className="player__exit" onClick={(evt) => {
        evt.preventDefault();
        history.push(AppRoute.ROOT);
      }}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time" onMouseDown={onToggleMove}>
            <progress className="player__progress" value={progress} max="100" ref={progressRef}></progress>
            <div className="player__toggler" style={{left: togglerPosition + `%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{timeToWatch}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={onPlayClick}>
            {playControl}
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen" onClick={onFullScreen}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

PlayerScreen.propTypes = {
  currentFilm: filmProp,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onPlayClick: PropTypes.func.isRequired,
  progress: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onFullScreen: PropTypes.func.isRequired,
  containerRef: refProp,
  progressRef: refProp,
  onToggleMove: PropTypes.func.isRequired,
  togglerPosition: PropTypes.number.isRequired,
};

export default PlayerScreen;
