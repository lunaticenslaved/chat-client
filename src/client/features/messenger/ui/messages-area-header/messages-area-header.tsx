import { OnlineStatus } from '#/client/shared/components/online-status';
import { notReachable } from '#/client/shared/utils';
import { ConnectionType } from '#/domain/connection';

import { SelectedItem } from '../../types';

import classes from './messages-area-header.module.scss';

export type MessageAreaHeaderProps = {
  selectedItem: SelectedItem;
  isOnline: boolean;
};

function getTitle(selectedItem: SelectedItem): string {
  if (selectedItem.type === 'user') {
    return selectedItem.user.login;
  } else if (selectedItem.type === 'connection') {
    const connection = selectedItem.connection;

    if (connection.type === ConnectionType.OneToOne) {
      return connection.oneToOneDialog.partner.login;
    } else if (connection.type === ConnectionType.Group) {
      return 'Not implemented';
    } else {
      notReachable(connection);
    }
  } else {
    notReachable(selectedItem);
  }
}

export const MessageAreaHeader = ({ selectedItem, isOnline }: MessageAreaHeaderProps) => {
  const title = getTitle(selectedItem);

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
