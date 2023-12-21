import { SocketEventListener } from '../socket-listener';

import { ViewerIsOfflineResponse, ViewerIsOnlineResponse, ViewerServerEvents } from './types';

type ViewerEvents = {
  'user-is-offline': ViewerIsOfflineResponse;
  'user-is-online': ViewerIsOnlineResponse;
};

export class ViewerEventsListener extends SocketEventListener<
  ViewerEvents,
  keyof ViewerEvents,
  ViewerServerEvents
> {
  override eventsMap = {
    'user-is-offline': ViewerServerEvents.isOffline,
    'user-is-online': ViewerServerEvents.isOnline,
  };
}
