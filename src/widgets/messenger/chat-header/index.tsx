import { OnlineStatus } from "shared/components/online-status";

import classes from "./home-page.module.scss";

interface ChatHeaderProps {
  title: string;
  isOnline: boolean;
}

export const ChatHeader = (props: ChatHeaderProps) => {
  return (
    <div className={classes.chatHeader}>
      <h2>{props.title}</h2>
      <div className={classes.onlineStatus}>
        <OnlineStatus isOnline={props.isOnline} />
        <span>{props.isOnline ? "онлайн" : "оффлайн"}</span>
      </div>
    </div>
  );
};
