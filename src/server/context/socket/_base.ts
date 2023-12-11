import { Context } from '#/server/context';

export class SocketEventEmitter {
  protected context: Context;

  constructor(context: Context) {
    this.context = context;
  }
}
