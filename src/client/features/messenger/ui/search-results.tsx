import { Fragment } from 'react';

import { Empty } from 'antd';

import { UsersList } from '#/client/entities/user';
import { SidebarSection } from '#/client/shared/components/sidebar';

import { useMessengerContext } from '../context';

import { ConnectionsList } from './connections-list';

export function SearchResults() {
  const { foundConnections, foundUsers, setSelectedConnection, setSelectedUser } =
    useMessengerContext();

  return (
    <Fragment>
      {!foundUsers.length && !foundConnections.length && <Empty />}
      {!!foundUsers.length && (
        <SidebarSection title="Users">
          <UsersList users={foundUsers} onClick={setSelectedUser} />
        </SidebarSection>
      )}
      {!!foundConnections.length && (
        <SidebarSection title="Connections">
          <ConnectionsList connections={foundConnections} onClick={setSelectedConnection} />
        </SidebarSection>
      )}
    </Fragment>
  );
}
