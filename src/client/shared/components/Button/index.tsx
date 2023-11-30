import AntButton from 'antd/lib/button';
import type { ButtonProps as AntButtonProps } from 'antd/lib/button';
import cn from 'classnames';

import './index.scss';

type ButtonProps = AntButtonProps;

export const Button = (props: ButtonProps) => {
  return (
    <AntButton type="primary" {...props} className={cn('button', props.className)}>
      {props.children}
    </AntButton>
  );
};
