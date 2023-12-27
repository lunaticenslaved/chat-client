import { PropsWithChildren, ReactNode } from 'react';

import { css } from '@emotion/react';

import { Flex } from '#/client/shared/components/flex';
import { CircularProgress } from '#/client/shared/components/progress';
import { ReadStatusIcon } from '#/client/shared/components/read-status-icon';
import { MessageAttachment } from '#/domain/message';

import { formatMessageTime } from '../utils';

interface MessageWrapperProps extends PropsWithChildren {
  isMe: boolean;
  avatar(props: { size: string }): ReactNode;
  attachments?: MessageAttachment[];
  createdAt: string;
  status?: 'is-read' | 'is-not-read' | 'loading';
}

const rootCSS = css`
  margin-bottom: 10px;
  padding: 0 20px;
`;

const avatarCSS = (isMe: boolean) => css`
  margin-bottom: 10px;
  margin-right: ${isMe ? 0 : '10px'};
  margin-left: ${!isMe ? 0 : '10px'};
`;

const dateCSS = css`
  text-align: right;
`;

const attachmentsCSS = css`
  margin-top: 10px;

  & > .attachment-item {
    height: 50px;
    width: 50px;
    margin-right: 10px;
  }
`;

const bubbleCSS = (isMe: boolean) => css`
  padding: 10px;
  border-radius: ${isMe ? '10px 10px 0 10px' : '10px 10px 10px 0'};
  background-color: #e5edff !important;
  box-shadow: 0 5px 5px rgba(54, 116, 255, 0.04) !important;

  * {
    margin: 0;
  }
`;

const readStatusCSS = css`
  margin-right: 5px;
`;

export const MessageWrapper = ({
  avatar,
  isMe,
  status,
  children,
  attachments,
  createdAt,
}: MessageWrapperProps) => {
  return (
    <Flex alignItems="flex-end" direction={isMe ? 'row-reverse' : 'row'} css={rootCSS}>
      <div css={avatarCSS(isMe)}>{avatar({ size: '40px' })}</div>
      <div>
        <Flex direction={isMe ? 'row-reverse' : 'row'} alignItems="flex-end">
          <div css={bubbleCSS(isMe)}>{children}</div>
          <div css={readStatusCSS}>
            {isMe && status === 'is-read' && <ReadStatusIcon isRead={true} />}
            {isMe && status === 'is-not-read' && <ReadStatusIcon isRead={false} />}
            {isMe && status === 'loading' && <CircularProgress size="small" />}
          </div>
        </Flex>

        {!!attachments?.length && (
          <Flex wrap="nowrap" css={attachmentsCSS}>
            {attachments.map(att => (
              <div key={att.id} className="attachment-item">
                <img src={att.url} alt={att.filename} />
              </div>
            ))}
          </Flex>
        )}

        <Flex justifyContent={isMe ? 'flex-end' : 'flex-start'}>
          <time dateTime={createdAt} css={dateCSS}>
            {formatMessageTime(createdAt)}
          </time>
        </Flex>
      </div>
    </Flex>
  );
};
