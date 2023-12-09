import { Message } from '#/domain/message';

import { ListMessagesRequest as ListMessagesRequestBase } from '../../service/message';

export type ListMessagesResponse = Message[];
export type ListMessagesRequest = ListMessagesRequestBase & {
  token: string;
  origin: string;
};
