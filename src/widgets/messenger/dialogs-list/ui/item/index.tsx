import { PropsWithChildren } from "react";

import dayjs from "shared/lib/dayjs";
import { ReadStatusIcon } from "shared/components/read-status-icon";
import { Avatar } from "shared/components/avatar";

import classes from "./DialogItem.module.scss";

export interface DialogItemProps extends PropsWithChildren {
  user: {
    id: number;
    name: string;
    avatar: string;
    isOnline: boolean;
  };
  message: {
    senderId: number;
    time: string;
    text: string;
    isRead: boolean;
  };
  notReadMessages: number;
}

export const DialogItem = (props: DialogItemProps) => {
  const isMyMessage = props.user.id !== props.message.senderId;

  let status: JSX.Element | null = null;

  if (isMyMessage) {
    status = <ReadStatusIcon isRead={props.message.isRead} />;
  } else if (props.notReadMessages > 0) {
    status = (
      <span className={classes.count}>
        {props.notReadMessages > 99 ? "99+" : props.notReadMessages}
      </span>
    );
  }

  return (
    <div className={classes.root}>
      <Avatar
        className={classes.avatar}
        url={props.user.avatar}
        alt={"Аватар " + props.user.name}
        isOnline={props.user.isOnline}
      />

      <div className={classes.body}>
        <div className={classes.line1}>
          <h6 className={classes.name}>{props.user.name}</h6>
          <time className={classes.time} dateTime={props.message.time}>
            {dayjs(props.message.time).fromNow()}
          </time>
        </div>

        <div className={classes.line2}>
          <p className={classes.text}>{props.message.text}</p>

          <div className={classes.status}>{status}</div>
        </div>
      </div>
    </div>
  );
};
