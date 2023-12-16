import { lazy } from 'react';
import { Outlet, Route } from 'react-router-dom';

const ChatPage = lazy(() => import('./page'));

export { useChatNavigation } from './navigation';

export function useChatPages() {
  return (
    <Route path="chat" element={<Outlet />}>
      <Route index element={<ChatPage />} />
    </Route>
  );
}
