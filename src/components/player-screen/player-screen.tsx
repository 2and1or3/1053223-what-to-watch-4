import * as React from "react";

import {FilmType} from '../../types';
import history from '../../history';
import {getWatchTimeFormat} from '../../utils';

interface Props {
  currentFilm: FilmType;
  children: React.ReactNode;
  onPlayClick: () => void;
  progress: number;
  isPlaying: boolean;
  onFullScreen: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
  progressRef: React.RefObject<HTMLProgressElement>;
  onToggleMove: (downEvt: React.SyntheticEvent) => void;
  togglerPosition: number;
}

const PlayerScreen: React.FunctionComponent<Props> = (props: Props) => {
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
        history.goBack();
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

export default PlayerScreen;
