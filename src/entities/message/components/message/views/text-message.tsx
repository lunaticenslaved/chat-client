import { MessageWrapper } from "../components/wrapper";
import { TextMessageProps } from "../types";
import classes from "../styles.module.scss";

export function TextMessage({ text, ...props }: TextMessageProps) {
  return (
    <MessageWrapper {...props} text={text}>
      <div className={classes.bubble}>
        <p className={classes.text}>{text}</p>
      </div>
    </MessageWrapper>
  );
}
