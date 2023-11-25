import { OnlineStatus } from '@/shared/components/online-status';

import classes from './messages-area-header.module.scss';

export type MessageAreaHeaderProps = {
  title: string;
  isOnline: boolean;
};

export const MessageAreaHeader = (props: MessageAreaHeaderProps) => {
  return (
    <div className={classes.chatHeader}>
      <h3>{props.title}</h3>
      <div className={classes.onlineStatus}>
        <OnlineStatus isOnline={props.isOnline} />
        <span>{props.isOnline ? 'онлайн' : 'оффлайн'}</span>
      </div>
    </div>
  );
};
