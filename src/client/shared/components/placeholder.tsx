import { ReactNode } from 'react';

import { css } from '@emotion/react';
import { Empty, Spin, Typography } from 'antd';

import { Flex } from '#/client/shared/components/flex';
import { notReachable } from '#/shared/utils';

interface ErrorView {
  view: 'error';
  text: string;
}

interface EmptyView {
  view: 'empty';
  text: string;
}

interface LoadingView {
  view: 'loading';
  text: string;
}

const cssStyles = css`
  height: 100%;
  width: 100%;
`;

export type PlaceholderProps = ErrorView | EmptyView | LoadingView;

export function Placeholder({ text, view }: PlaceholderProps) {
  let content: ReactNode = null;

  if (view === 'error') {
    content = <Typography.Paragraph>{text}</Typography.Paragraph>;
  } else if (view === 'empty') {
    return (
      <Empty
        description={text}
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      />
    );
  } else if (view === 'loading') {
    content = (
      <>
        <Spin />
        <Typography.Paragraph>{text}</Typography.Paragraph>
      </>
    );
  } else {
    notReachable(view);
  }

  return (
    <Flex css={cssStyles} direction="column" alignItems="center" justifyContent="center">
      {content}
    </Flex>
  );
}
