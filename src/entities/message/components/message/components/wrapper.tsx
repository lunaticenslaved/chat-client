import cn from 'classnames';

import classes from '../styles.module.scss';
import { MessageProps } from '../types';

import { Avatar } from '@/shared/components/avatar';
import { ReadStatusIcon } from '@/shared/components/read-status-icon';
import dayjs from '@/shared/lib/dayjs';

const getStatus = ({ isRead, isMe }: { isRead: boolean; isMe: boolean }) =>
  isMe ? <ReadStatusIcon isRead={isRead} /> : null;

export const MessageWrapper = (props: MessageProps) => {
  const status = getStatus({
    isMe: props.isMe,
    isRead: !!props.isRead,
  });

  let attachments: JSX.Element | null = null;
  if (props.attachments.length) {
    attachments = (
      <>
        {props.attachments.map(att => (
          <div key={att.id} className={classes.attachmentItem}>
            <img src={att.url} alt={att.filename} />
          </div>
        ))}
      </>
    );
  }

  const rootClassName = cn(classes.root, {
    [classes.isMe]: props.isMe,
  });

  return (
    <div className={rootClassName}>
      <>
        <Avatar className={classes.avatar} url={props.avatarSrc} name={props.ownerName} />
        <div>
          <div className={classes.content}>
            {props.children}
            {status && <div className={classes.readStatus}>{status}</div>}
          </div>

          {attachments && <div className={classes.attachments}>{attachments}</div>}

          <time dateTime={props.createdAt} className={classes.date}>
            {dayjs(props.createdAt).fromNow()}
          </time>
        </div>
      </>
    </div>
  );
};
