export enum ViewerClientEvents {
  isOnline = 'VIEWER:ONLINE',
  isOffline = 'VIEWER:OFFLINE',
}

export enum ViewerServerEvents {
  isOnline = 'VIEWER:ONLINE',
  isOffline = 'VIEWER:OFFLINE',
}

export interface ViewerIsOnlineResponse {
  userId: string;
}

export interface ViewerIsOfflineResponse {
  userId: string;
}
