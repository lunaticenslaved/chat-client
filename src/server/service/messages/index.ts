import { MessagesService } from './service';

export * from './types';
export { type Message, select as selectMessage } from './utils';

export const messagesService = new MessagesService();
