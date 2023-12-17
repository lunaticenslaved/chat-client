import { ReactNode, createRef, useCallback } from 'react';

import { List, theme } from 'antd';
import cn from 'classnames';

import { useHover } from '#/client/shared/hooks/hover';

import classes from './list-item.module.scss';

export interface ListItemProps {
  avatar: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  isActive: boolean;
  onClick?(): void;
}

export function ListItem({ avatar, title, description, isActive, onClick }: ListItemProps) {
  const handleClick = useCallback(() => onClick?.(), [onClick]);
  const { getDesignToken } = theme;
  const token = getDesignToken();
  const itemRef = createRef<HTMLElement>();
  const isHovered = useHover(itemRef);

  const background = isActive ? token.colorPrimary : isHovered ? token.colorBgTextHover : 'white';

  return (
    <List.Item
      ref={itemRef}
      style={{ background }}
      className={cn(classes.listItem, {
        [classes.listItemActive]: isActive,
      })}
      onClick={onClick ? handleClick : undefined}>
      <List.Item.Meta avatar={avatar} title={title} description={description} />
    </List.Item>
  );
}
