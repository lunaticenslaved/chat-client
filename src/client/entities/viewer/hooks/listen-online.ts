import { useEffect } from 'react';

import { ViewerEventsEmitter } from '#/api/viewer';
import { socket } from '#/client/shared/socket-context';

import { useViewer } from './viewer';

const viewerEventsEmitter = new ViewerEventsEmitter(socket);

export function useListenOnline() {
  const { user, setOnline } = useViewer();

  useEffect(() => {
    function onFocused() {
      if (!user) return;
      setOnline(true);
      viewerEventsEmitter.isOnline();
    }
    function onBlurred() {
      if (!user) return;
      setOnline(false);
      viewerEventsEmitter.isOffline();
    }

    onFocused();

    window.addEventListener('focus', onFocused);
    window.addEventListener('blur', onBlurred);

    return () => {
      window.removeEventListener('focus', onFocused);
      window.removeEventListener('blur', onBlurred);
    };
  }, [setOnline, user]);
}
