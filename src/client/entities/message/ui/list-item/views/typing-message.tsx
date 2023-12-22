import { forwardRef } from 'react';

import cn from 'classnames';

import classes from '../styles.module.scss';
import { TypingMessageProps } from '../types';

export const TypingMessage = forwardRef<HTMLDivElement, TypingMessageProps>(
  (props: TypingMessageProps, ref) => {
    const { avatar } = props;
    return (
      <div ref={ref} className={cn(classes.root, classes.isTyping)}>
        <>
          <div className={classes.avatar}>{avatar({ size: '30px' })}</div>
          <div>
            <div className={classes.content}>
              <div className={classes.bubble}>
                <div className={classes.typingAnimation}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>

            <time className={classes.date}></time>
          </div>
        </>
      </div>
    );
  },
);

TypingMessage.displayName = 'TypingMessage';
