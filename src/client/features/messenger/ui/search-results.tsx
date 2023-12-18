import { Fragment } from 'react';

import { Typography } from 'antd';

import { DialogsList } from '#/client/entities/dialog';
import { UsersList } from '#/client/entities/user';

import { useMessengerContext } from '../context';

export function SearchResults() {
  const { foundConnections, foundUsers, setSelectedConnection, setSelectedUser } =
    useMessengerContext();

  return (
    <Fragment>
      {!!foundUsers.length && (
        <section>
          <Typography.Title level={4}>Users</Typography.Title>
          <UsersList users={foundUsers} onClick={setSelectedUser} />
        </section>
      )}
      {!!foundConnections.length && (
        <section style={{ marginTop: '20px' }}>
          <Typography.Title level={4}>Connections</Typography.Title>
          <DialogsList dialogs={foundConnections} onClick={setSelectedConnection} />
        </section>
      )}
    </Fragment>
  );
}
