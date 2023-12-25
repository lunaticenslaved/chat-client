export class EventBus<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Events extends Record<Keys, any>,
  Keys extends string,
> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private listeners: Record<string, any[]> = {};

  on<TEvent extends Keys>(event: TEvent, fn: (args: Events[TEvent]) => void) {
    const arr = this.listeners[event] || [];
    arr.push(fn);
    this.listeners[event] = arr;
  }

  off<TEvent extends Keys>(event: TEvent, fn: (args: Events[TEvent]) => void) {
    this.listeners[event] = (this.listeners[event] || []).filter(listener => listener !== fn);
  }

  emit<TEvent extends Keys>(event: TEvent, data: Events[TEvent]) {
    for (const listener of this.listeners[event] || []) {
      listener(data);
    }
  }
}
