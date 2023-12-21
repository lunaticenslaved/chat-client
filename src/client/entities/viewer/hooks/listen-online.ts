import { useEffect } from 'react';

import { ViewerEventsEmitter } from '#/api/viewer';
import { socket } from '#/client/shared/socket-context';

import { useViewer } from './viewer';

const viewerEventsEmitter = new ViewerEventsEmitter(socket);

export function useListenOnline() {
  const { user } = useViewer();

  useEffect(() => {
    function onFocused() {
      if (!user) return;
      viewerEventsEmitter.isOnline();
    }
    function onBlurred() {
      if (!user) return;
      viewerEventsEmitter.isOffline();
    }

    onFocused();

    window.addEventListener('focus', onFocused);
    window.addEventListener('blur', onBlurred);

    return () => {
      window.removeEventListener('focus', onFocused);
      window.removeEventListener('blur', onBlurred);
    };
  }, [user]);
}
