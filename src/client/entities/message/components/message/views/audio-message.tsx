import { createRef, useCallback, useEffect, useState } from 'react';

import PauseSvg from '@/shared/img/pause.svg';
import PlaySvg from '@/shared/img/play.svg';
import WaveSvg from '@/shared/img/wave.svg';

import { MessageWrapper } from '../components/wrapper';
import classes from '../styles.module.scss';
import { AudioMessageProps } from '../types';
import { secondsToHms } from '../utils';

export function AudioMessage({ audio, ...props }: AudioMessageProps) {
  const [isPlaying, _setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, _setCurrentTime] = useState(0);
  const audioElem = createRef<HTMLAudioElement>();

  const setCurrentTime = useCallback(() => {
    if (isPlaying) {
      const ct = audioElem.current?.currentTime || 0;
      const d = audioElem.current?.duration || 0;

      setProgress(Math.ceil((ct / d) * 100));
      _setCurrentTime(audioElem.current?.currentTime || 0);
    } else {
      _setCurrentTime(audioElem.current?.duration || 0);
    }
  }, [audioElem, isPlaying]);

  useEffect(() => {
    const el = audioElem.current;
    const setPlaying = () => _setPlaying(true);
    const setPaused = () => _setPlaying(false);

    if (el) {
      el.addEventListener('playing', setPlaying);
      el.addEventListener('pause', setPaused);
      el.addEventListener('ended', setPaused);
      el.addEventListener('timeupdate', setCurrentTime);
    }
    return () => {
      if (el) {
        el.removeEventListener('playing', setPlaying);
        el.removeEventListener('pause', setPaused);
        el.removeEventListener('ended', setPaused);
        el.removeEventListener('timeupdate', setCurrentTime);
      }
    };
  }, [audioElem, setCurrentTime]);

  useEffect(() => {
    const el = audioElem.current;

    if (el) {
      setCurrentTime();
      el.addEventListener('onloadedmetadata ', setCurrentTime);
    }
    return () => {
      if (el) {
        el.removeEventListener('onloadedmetadata', setCurrentTime);
      }
    };
  }, [audioElem, setCurrentTime]);

  const togglePlay = () => {
    if (audioElem.current) {
      if (audioElem.current.paused) {
        audioElem.current.play();
      } else {
        audioElem.current.pause();
      }
    }
  };

  return (
    <MessageWrapper {...props} attachments={[]}>
      <div className={classes.audioBubble}>
        {isPlaying && <div className={classes.audioProgress} style={{ width: progress + '%' }} />}

        <div className={classes.audioContent}>
          <audio ref={audioElem} src={audio.url} preload="auto">
            <a href={audio.url}>Download audio</a>
          </audio>

          <button className={classes.audioButton} onClick={togglePlay}>
            {isPlaying ? <PauseSvg /> : <PlaySvg />}
          </button>
          <div className={classes.audioDiagram}>
            <WaveSvg />
          </div>
          <span className={classes.audioTime}>{secondsToHms(currentTime)}</span>
        </div>
      </div>
    </MessageWrapper>
  );
}
