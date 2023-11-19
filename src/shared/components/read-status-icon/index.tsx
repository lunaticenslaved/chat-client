import cn from 'classnames';

import classes from './read-status.module.scss';
import NotReadSvg from '@/shared/img/noreaded.svg?react';
import ReadSvg from '@/shared/img/readed.svg?react';

export interface ReadStatusIconProps {
  isRead: boolean;
  className?: string;
}

export const ReadStatusIcon = (props: ReadStatusIconProps) => {
  const className = cn(props.className, classes.icon);

  return props.isRead ? <ReadSvg className={className} /> : <NotReadSvg className={className} />;
};
