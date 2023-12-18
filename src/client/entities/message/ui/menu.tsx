import { MouseEventHandler, ReactNode, useCallback, useMemo } from 'react';

import { Dropdown, MenuProps, Modal, Typography } from 'antd';

import { useToggle } from '#/client/shared/hooks';
import { Message } from '#/domain/message';

type MessageMenuProps = {
  children: ReactNode;
  message: Message;
  placement: 'left' | 'right';
  deleteMessage?(message: Message): void;
};

export function MessageMenu({
  children,
  message,
  deleteMessage: deleteMessageProp,
  placement,
}: MessageMenuProps) {
  const isDeleteOpen = useToggle();

  const deleteMessage: MouseEventHandler = useCallback(
    e => {
      e.preventDefault();
      deleteMessageProp && deleteMessageProp(message);
    },
    [deleteMessageProp, message],
  );

  const items: MenuProps['items'] = useMemo(() => {
    const result: MenuProps['items'] = [];

    if (deleteMessageProp) {
      result.push({
        key: '1',
        label: <a onClick={isDeleteOpen.setTrue}>Delete</a>,
      });
    }

    return result;
  }, [deleteMessageProp, isDeleteOpen.setTrue]);

  return (
    <>
      <Modal
        title="Do you want to delete the message"
        open={isDeleteOpen.value}
        onOk={deleteMessage}
        onCancel={isDeleteOpen.setFalse}>
        <Typography.Paragraph>The message will be deleted for everyone</Typography.Paragraph>
      </Modal>

      <Dropdown
        menu={{ items, style: { width: '150px' } }}
        overlayStyle={{ minWidth: '' }}
        trigger={['contextMenu']}
        disabled={items.length === 0}
        placement={placement === 'left' ? 'bottomLeft' : 'bottomRight'}>
        <div>{children}</div>
      </Dropdown>
    </>
  );
}
