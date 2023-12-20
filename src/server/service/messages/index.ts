import { MessagesService } from './service';

export * from './types';
export { type Message } from './utils';

export const messagesService = new MessagesService();
