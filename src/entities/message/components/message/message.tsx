import { AudioMessage } from "./views/audio-message";
import { ImageMessage } from "./views/image-message";
import { TextMessage } from "./views/text-message";
import { TypingMessage } from "./views/typing-message";
import { MessageProps } from "./types";

export function Message(props: MessageProps) {
  if (props.isTyping) {
    <TypingMessage {...props} />;
  }

  const singleAttachment = props.attachments.length === 1 ? props.attachments[0] : null;

  if (props.text) {
    return <TextMessage {...props} />;
  } else if (singleAttachment?.type === "image") {
    return <ImageMessage {...props} image={singleAttachment} />;
  } else if (singleAttachment?.type === "audio") {
    return <AudioMessage {...props} audio={singleAttachment} />;
  }

  return null;
}
