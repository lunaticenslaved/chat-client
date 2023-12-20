import { ReactNode, useMemo } from 'react';

import { Button, Dropdown, MenuProps } from 'antd';

import { useToggleUserInContacts } from '#/client/entities/contact';

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

export function SelectedItemMenu({ activator, selectedItem }: SelectedItemMenuProps) {
  const user = getUserFromSelectedItem(selectedItem);

  const items = useMemo((): NonNullable<MenuProps['items']> => {
    const arr: ReactNode[] = [];

    if (user) {
      arr.push(<AddToContactsButton userId={user.id} />);
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
