import { DialogsList } from '#/client/entities/dialog';
import { useViewer } from '#/client/entities/viewer';
import { LogoutButton } from '#/client/features/auth';
import {
  SearchInChannelsInput,
  SearchInChannelsResult,
} from '#/client/features/search/in-channels';
import { Avatar } from '#/client/shared/components/avatar';
import { Divider } from '#/client/shared/components/divider';
import { Connection } from '#/domain/connection';
import { User } from '#/domain/user';

import classes from './chat-layout.module.scss';

export interface ChatLayoutProps {
  query: string;
  dialogs: Connection[];
  messageArea: JSX.Element;

  setQuery(value: string): void;
  onDialogClick(value: Connection): void;
  onUserClick(value: User): void;
}

export const ChatLayout = ({
  messageArea,
  dialogs,
  query,
  setQuery,
  onDialogClick,
  onUserClick,
}: ChatLayoutProps) => {
  const viewer = useViewer();

  if (!viewer.user) return;

  return (
    <div className={classes.root}>
      <nav className={classes.nav}>
        <Avatar name={viewer.user.login} url={viewer.user.avatar?.link} />
        <LogoutButton />
      </nav>

      <Divider vertical />

      <main className={classes.main}>
        <aside className={classes.sidebar}>
          <SearchInChannelsInput search={query} onChange={setQuery} />

          <Divider />

          <div style={{ overflowY: 'auto' }}>
            {!query ? (
              <DialogsList dialogs={dialogs} onClick={onDialogClick} />
            ) : (
              <SearchInChannelsResult
                query={query}
                onDialogClick={onDialogClick}
                onUserClick={onUserClick}
              />
            )}
          </div>
        </aside>

        <Divider vertical />

        <div className={classes.content}>{messageArea}</div>
      </main>
    </div>
  );
};
