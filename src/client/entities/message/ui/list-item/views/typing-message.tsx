import { forwardRef } from 'react';

import cn from 'classnames';

import classes from '../styles.module.scss';
import { TypingMessageProps } from '../types';

export const TypingMessage = forwardRef<HTMLDivElement, TypingMessageProps>(
  (props: TypingMessageProps, ref) => {
    return (
      <div ref={ref} className={cn(classes.root, classes.isTyping)}>
        <>
          <div className={classes.avatar}>
            <img src={props.avatarSrc} alt={'Аватар ' + props.ownerName} />
          </div>
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
