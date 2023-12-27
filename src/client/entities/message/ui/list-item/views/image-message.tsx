import { MessageWrapper } from '../../message-wrapper';
import classes from '../styles.module.scss';
import { ImageMessageProps } from '../types';

export function ImageMessage({ image, ...props }: ImageMessageProps) {
  return (
    <MessageWrapper {...props} attachments={[]}>
      <div className={classes.image}>
        <img src={image.url} alt={image.filename} />
      </div>
    </MessageWrapper>
  );
}
