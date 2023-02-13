import React, { useCallback } from "react";
import cn from "classnames";

import { ReactComponent as PlaySvg } from "shared/img/play.svg";
import { ReactComponent as PauseSvg } from "shared/img/pause.svg";
import { ReactComponent as WaveSvg } from "shared/img/wave.svg";

import { AttachmentModel } from "../types";
import { ContentMessage, ContentMessageProps } from "./context-message";
import classes from "./Message.module.scss";

export type MessageProps =
  | (TypingMessageProps & { isTyping: boolean })
  | TextMessageProps;

export const Message = (props: MessageProps) => {
  if ("isTyping" in props) {
    return (
      <TypingMessage userName={props.userName} avatarUrl={props.avatarUrl} />
    );
  }

  const singleAttachment =
    "attachments" in props && props.attachments.length === 1
      ? props.attachments[0]
      : null;

  if ("text" in props && !!props.text) {
    return (
      <TextMessage
        attachments={props.attachments}
        userName={props.userName}
        avatarUrl={props.avatarUrl}
        createdAt={props.createdAt}
        isRead={props.isRead}
        isMe={props.isMe}
        text={props.text}
      />
    );
  } else if (singleAttachment?.type === "image") {
    return (
      <ImageMessage
        image={singleAttachment}
        userName={props.userName}
        avatarUrl={props.avatarUrl}
        createdAt={props.createdAt}
        isRead={props.isRead}
        isMe={props.isMe}
      />
    );
  } else if (singleAttachment?.type === "audio") {
    return (
      <AudioMessage
        audio={singleAttachment}
        userName={props.userName}
        avatarUrl={props.avatarUrl}
        createdAt={props.createdAt}
        isRead={props.isRead}
        isMe={props.isMe}
      />
    );
  }

  return null;
};

// Typing Message
interface TypingMessageProps {
  avatarUrl: string;
  userName: string;
}

const TypingMessage = (props: TypingMessageProps) => {
  return (
    <div className={cn(classes.root, classes.isTyping)}>
      <>
        <div className={classes.avatar}>
          <img src={props.avatarUrl} alt={"Аватар " + props.userName} />
        </div>
        <div>
          <div className={classes.content}>
            <div className={classes.bubble}>
              <div className={classes.typingAnimation}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>

          <time className={classes.date}></time>
        </div>
      </>
    </div>
  );
};

// Text Message
type TextMessageProps = ContentMessageProps & {
  text: string;
};

const TextMessage = ({ text, ...props }: TextMessageProps) => {
  return (
    <ContentMessage {...props}>
      <div className={classes.bubble}>
        <p>{text}</p>
      </div>
    </ContentMessage>
  );
};

// Image Message
type ImageMessageProps = Omit<ContentMessageProps, "attachments"> & {
  image: AttachmentModel;
};

const ImageMessage = ({ image, ...props }: ImageMessageProps) => {
  return (
    <ContentMessage {...props} attachments={[]}>
      <div className={classes.image}>
        <img src={image.url} alt={image.filename} />
      </div>
    </ContentMessage>
  );
};

// Audio Message
type AudioMessageProps = Omit<ContentMessageProps, "attachments"> & {
  audio: AttachmentModel;
};

function secondsToHms(d: number) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h.toString().padStart(2, "0") : "";
  var mDisplay = m.toString().padStart(2, "0");
  var sDisplay = s.toString().padStart(2, "0");

  if (hDisplay) return `${hDisplay}:${mDisplay}:${sDisplay}`;
  return `${mDisplay}:${sDisplay}`;
}

const AudioMessage = ({ audio, ...props }: AudioMessageProps) => {
  const [isPlaying, _setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [currentTime, _setCurrentTime] = React.useState(0);
  const audioElem = React.createRef<HTMLAudioElement>();

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

  React.useEffect(() => {
    const el = audioElem.current;
    const setPlaying = () => _setPlaying(true);
    const setPaused = () => _setPlaying(false);

    if (el) {
      el.addEventListener("playing", setPlaying);
      el.addEventListener("pause", setPaused);
      el.addEventListener("ended", setPaused);
      el.addEventListener("timeupdate", setCurrentTime);
    }
    return () => {
      if (el) {
        el.removeEventListener("playing", setPlaying);
        el.removeEventListener("pause", setPaused);
        el.removeEventListener("ended", setPaused);
        el.removeEventListener("timeupdate", setCurrentTime);
      }
    };
  }, [audioElem, setCurrentTime]);

  React.useEffect(() => {
    const el = audioElem.current;

    if (el) {
      setCurrentTime();
      el.addEventListener("onloadedmetadata ", setCurrentTime);
    }
    return () => {
      if (el) {
        el.removeEventListener("onloadedmetadata", setCurrentTime);
      }
    };
  }, []);

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
    <ContentMessage {...props} attachments={[]}>
      <div className={classes.audioBubble}>
        {isPlaying && (
          <div
            className={classes.audioProgress}
            style={{ width: progress + "%" }}
          />
        )}

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
    </ContentMessage>
  );
};
