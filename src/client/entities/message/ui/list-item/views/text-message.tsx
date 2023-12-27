import { MessageWrapper } from '../../message-wrapper';
import { TextMessageProps } from '../types';

export function TextMessage({ text, isRead, ...props }: TextMessageProps) {
  return (
    <MessageWrapper {...props} status={isRead ? 'is-read' : 'is-not-read'}>
      <p>{text}</p>
    </MessageWrapper>
  );
}
