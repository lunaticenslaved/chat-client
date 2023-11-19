import { ReactNode } from 'react';

import { Typography } from 'antd';

export type AuthFormDescriptionProps = {
  children: ReactNode;
  className?: string;
};

export const AuthFormDescription = ({ children, className }: AuthFormDescriptionProps) => {
  return (
    <Typography.Paragraph style={{ textAlign: 'center' }} className={className}>
      {children}
    </Typography.Paragraph>
  );
};
