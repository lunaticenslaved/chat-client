import { PropsWithChildren } from 'react';

import cn from 'classnames';

import { SizeType } from '#/client/shared/types';

import classes from './Block.module.scss';

interface BlockProps extends PropsWithChildren {
  className?: string;
  size?: SizeType;
}

export const Block = (props: BlockProps) => {
  const className = cn('block', classes.root, props.className, {
    [classes.large]: props.size === 'large',
    [classes.middle]: !props.size || props.size === 'middle',
    [classes.small]: props.size === 'small',
  });
  return <div className={className}>{props.children}</div>;
};
