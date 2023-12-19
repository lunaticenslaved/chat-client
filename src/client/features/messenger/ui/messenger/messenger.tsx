import { MessengerContext } from '../../context';
import { ConnectionInfo } from '../connection-info';
import { MessageInput } from '../message-input';
import { MessagesArea } from '../messages-area';
import { MessageAreaHeader } from '../messages-area-header/messages-area-header';
import { MessengerSidebar } from '../sidebar';

import classes from './messenger.module.scss';

export const Messenger = () => {
  return (
    <MessengerContext>
      {({ selectedItem, connectionInfo }) => (
        <div className={classes.main}>
          <MessengerSidebar />

          <div className={classes.content}>
            {!!selectedItem && (
              <MessageAreaHeader
                selectedItem={selectedItem}
                isOnline={false}
                // TODO add isOnline
                // isOnline={currentDialog.partner.isOnline}
              />
            )}
            <MessagesArea />
            {!!selectedItem && <MessageInput />}
          </div>

          {connectionInfo.isOpen && <ConnectionInfo />}
        </div>
      )}
    </MessengerContext>
  );
};
