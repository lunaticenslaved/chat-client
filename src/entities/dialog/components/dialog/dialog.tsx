import cn from 'classnames';

import { useViewer } from '@/entities/viewer';
import { Avatar } from '@/shared/components/avatar';
import { ReadStatusIcon } from '@/shared/components/read-status-icon';
import dayjs from '@/shared/lib/dayjs';

import { DialogModel } from '../../types';

import classes from './dialog.module.scss';

export interface DialogProps {
  isSelected?: boolean;
  dialog: DialogModel;
  onSelect: (item: DialogModel) => void;
}

export const Dialog = (props: DialogProps) => {
  const { viewer } = useViewer();

  let status: JSX.Element | null = null;

  if (viewer?.id === props.dialog.lastMessage.authorId) {
    status = <ReadStatusIcon isRead={props.dialog.lastMessage.isRead} />;
  } else if (props.dialog.notReadMessagesCount > 0) {
    status = (
      <span className={classes.count}>
        {props.dialog.notReadMessagesCount > 99 ? '99+' : props.dialog.notReadMessagesCount}
      </span>
    );
  }

  const onClick = () => {
    props.onSelect(props.dialog);
  };
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      props.onSelect(props.dialog);
    }
  };

  const className = cn(classes.root, {
    [classes.isSelected]: props.isSelected,
  });

  return (
    <div className={className} tabIndex={1} onClick={onClick} onKeyDown={onKeyDown}>
      <div className={classes.avatarWrapper}>
        <Avatar
          className={classes.avatar}
          url={props.dialog.partner.avatar?.link}
          name={props.dialog.partner.login}
          // TODO: add isOnline
          // isOnline={props.dialog.partner.isOnline}
        />
      </div>

      <div className={classes.body}>
        <div className={classes.line1}>
          <h6 className={classes.name}>{props.dialog.partner.login}</h6>
          <time className={classes.time} dateTime={props.dialog.lastMessage.createdAt}>
            {dayjs(props.dialog.lastMessage.createdAt).fromNow()}
          </time>
        </div>

        <div className={classes.line2}>
          <p className={classes.text}>{props.dialog.lastMessage.text}</p>
          <div className={classes.status}>{status}</div>
        </div>
      </div>
    </div>
  );
};
