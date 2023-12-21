import { ReactNode, useMemo } from 'react';

import { Button, Dropdown, MenuProps, Modal } from 'antd';

import { useToggleUserInContacts } from '#/client/entities/contact';
import { useBlockUser } from '#/client/entities/user';
import { useDialog } from '#/client/shared/hooks';

import { SelectedItem } from '../types';
import { getUserFromSelectedItem } from '../utils';

interface SelectedItemMenuProps {
  activator: ReactNode;
  selectedItem: SelectedItem;
}

function AddToContactsButton({ userId }: { userId: string }) {
  const { toggleUserInContacts, isInContacts, isLoading } = useToggleUserInContacts(userId);

  if (!toggleUserInContacts) return null;

  return (
    <Button loading={isLoading} disabled={isLoading} type="link" onClick={toggleUserInContacts}>
      {isInContacts ? 'Remove from contacts' : 'Add to contacts'}
    </Button>
  );
}

function BlockUserButton({ userId }: { userId: string }) {
  const dialog = useDialog();
  const { unblockUser, blockUser, isUserBlocked } = useBlockUser(userId);

  if (isUserBlocked) {
    return (
      <Button type="link" danger onClick={unblockUser}>
        Unblock
      </Button>
    );
  }

  return (
    <>
      <Modal
        title="Block user?"
        open={dialog.isOpen}
        onCancel={dialog.close}
        onOk={() => {
          blockUser();
          dialog.close();
        }}>
        The user will not be able to send you messages
      </Modal>
      <Button type="link" danger onClick={dialog.open}>
        Block
      </Button>
    </>
  );
}

export function SelectedItemMenu({ activator, selectedItem }: SelectedItemMenuProps) {
  const user = getUserFromSelectedItem(selectedItem);

  const items = useMemo((): NonNullable<MenuProps['items']> => {
    const arr: ReactNode[] = [];

    if (user) {
      arr.push(<AddToContactsButton userId={user.id} />);
      arr.push(<BlockUserButton userId={user.id} />);
    }

    return arr
      .filter(label => !!label)
      .map((label, index) => ({
        key: index,
        label,
      }));
  }, [user]);

  return (
    <Dropdown menu={{ items }} trigger={['click']} disabled={items.length === 0}>
      <a onClick={e => e.preventDefault()}>{activator}</a>
    </Dropdown>
  );
}
