import { OnlineStatus } from "shared/components/online-status";

import classes from "./header.module.scss";

interface HeaderProps {
  title: string;
  isOnline: boolean;
}

export const Header = (props: HeaderProps) => {
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
