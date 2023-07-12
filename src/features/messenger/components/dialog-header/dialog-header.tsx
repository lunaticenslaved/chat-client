import { OnlineStatus } from "shared/components/online-status";

import classes from "./dialog-header.module.scss";

interface DialogHeaderProps {
  title: string;
  isOnline: boolean;
}

export const DialogHeader = (props: DialogHeaderProps) => {
  return (
    <div className={classes.chatHeader}>
      <h3>{props.title}</h3>
      <div className={classes.onlineStatus}>
        <OnlineStatus isOnline={props.isOnline} />
        <span>{props.isOnline ? "онлайн" : "оффлайн"}</span>
      </div>
    </div>
  );
};
