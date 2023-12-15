import { OnlineStatus } from '#/client/shared/components/online-status';
import { Connection, ConnectionType } from '#/domain/connection';
import { User } from '#/domain/user';

import classes from './messages-area-header.module.scss';

export type MessageAreaHeaderProps = {
  selectedItem: User | Connection;
  isOnline: boolean;
};

export const MessageAreaHeader = ({ selectedItem, isOnline }: MessageAreaHeaderProps) => {
  const title =
    'email' in selectedItem
      ? selectedItem.login
      : selectedItem.type === ConnectionType.OneToOne
        ? selectedItem.type
        : null;

  return (
    <div className={classes.chatHeader}>
      <h3>{title}</h3>
      <div className={classes.onlineStatus}>
        <OnlineStatus isOnline={isOnline} />
        <span>{isOnline ? 'онлайн' : 'оффлайн'}</span>
      </div>
    </div>
  );
};
