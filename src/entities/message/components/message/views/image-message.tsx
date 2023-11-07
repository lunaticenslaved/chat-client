import { MessageWrapper } from "../components/wrapper";
import { ImageMessageProps } from "../types";
import classes from "../styles.module.scss";

export function ImageMessage({ image, ...props }: ImageMessageProps) {
  return (
    <MessageWrapper {...props} attachments={[]}>
      <div className={classes.image}>
        <img src={image.url} alt={image.filename} />
      </div>
    </MessageWrapper>
  );
}
