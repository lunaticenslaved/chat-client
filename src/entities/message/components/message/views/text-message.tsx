import { MessageWrapper } from '../components/wrapper';
import classes from '../styles.module.scss';
import { TextMessageProps } from '../types';

export function TextMessage({ text, ...props }: TextMessageProps) {
  return (
    <MessageWrapper {...props} text={text}>
      <div className={classes.bubble}>
        <p className={classes.text}>{text}</p>
      </div>
    </MessageWrapper>
  );
}
