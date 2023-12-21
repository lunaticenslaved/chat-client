import { Link } from 'react-router-dom';

import { CloseOutlined } from '@ant-design/icons';
import { Button, List } from 'antd';

import { UserListItem } from '#/client/entities/user/ui/list-item';
import { contactsRoutes } from '#/client/pages/root/contacts';
import { Sidebar } from '#/client/shared/components/sidebar';

import { useListBlockedUsers } from '../hooks/list-blocked-users';

export function BlockedUsersSidebar() {
  const { users, isLoading, unblockUser } = useListBlockedUsers();

  return (
    <Sidebar
      title="Blocked users"
      icon={({ size }) => (
        <Link to={contactsRoutes.contacts}>
          <Button type="link">
            <CloseOutlined style={{ fontSize: size }} />
          </Button>
        </Link>
      )}>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <List
          dataSource={users}
          renderItem={user => {
            return (
              <UserListItem
                user={user}
                actions={[
                  <Button key="unblock" onClick={() => unblockUser(user.id)}>
                    Unblock
                  </Button>,
                ]}
              />
            );
          }}
        />
      )}
    </Sidebar>
  );
}
