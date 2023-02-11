import cn from "classnames";

import dayjs from "shared/lib/dayjs";
import { ReactComponent as ReadSvg } from "shared/img/readed.svg";
import { ReactComponent as NotReadSvg } from "shared/img/noreaded.svg";

import { AttachmentModel } from "../types";
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
  } else if ("attachments" in props && props.attachments.length === 1) {
    return (
      <ImageMessage
        image={props.attachments[0]}
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

interface TextMessageProps {
  avatarUrl: string;
  userName: string;
  createdAt: string;
  text: string;
  isMe: boolean;
  isRead: boolean;
  attachments: AttachmentModel[];
}

const TextMessage = (props: TextMessageProps) => {
  let rootClasses: string = "";

  rootClasses = cn(classes.root, { [classes.isMe]: props.isMe });

  let icon: JSX.Element | null = null;
  let attachments: JSX.Element | null = null;

  if (props.isMe) {
    icon = props.isRead ? <ReadSvg /> : <NotReadSvg />;
  }

  if (props.attachments.length) {
    attachments = (
      <>
        {props.attachments.map((att) => (
          <div key={att.id} className={classes.attachmentItem}>
            <img src={att.url} alt={att.filename} />
          </div>
        ))}
      </>
    );
  }

  return (
    <div className={rootClasses}>
      <div className={classes.avatar}>
        <img src={props.avatarUrl} alt={"Аватар " + props.userName} />
      </div>
      <div>
        <div className={classes.content}>
          <div className={classes.bubble}>
            <p>{props.text}</p>
          </div>
          {icon && <div className={classes.readStatus}>{icon}</div>}
        </div>

        {attachments && (
          <div className={classes.attachments}>{attachments}</div>
        )}

        <time dateTime={props.createdAt} className={classes.date}>
          {dayjs(props.createdAt).fromNow()}
        </time>
      </div>
    </div>
  );
};

interface ImageMessageProps {
  avatarUrl: string;
  userName: string;
  createdAt: string;
  isMe: boolean;
  isRead: boolean;
  image: AttachmentModel;
}

const ImageMessage = (props: ImageMessageProps) => {
  return (
    <div className={cn(classes.root, classes.isTyping)}>
      <>
        <div className={classes.avatar}>
          <img src={props.avatarUrl} alt={"Аватар " + props.userName} />
        </div>
        <div>
          <div className={classes.content}>
            <div className={classes.image}>
              <img src={props.image.url} alt={props.image.filename} />
            </div>
          </div>

          <time className={classes.date}></time>
        </div>
      </>
    </div>
  );
};
