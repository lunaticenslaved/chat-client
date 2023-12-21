import { lazy } from 'react';
import { Route } from 'react-router-dom';

import { withLoadPage } from '#/client/shared/hoc/loadPage';

import { ContactsLayout } from './layout';
import { contactsRoutes } from './routes';

const Index = withLoadPage(lazy(() => import('./page-index')));
const BlockedUsers = withLoadPage(lazy(() => import('./page-blocked')));

export const contactsRouter = (
  <Route path={contactsRoutes.contacts} element={<ContactsLayout />}>
    <Route index element={<Index />} />
    <Route path={contactsRoutes.blockedContacts} element={<BlockedUsers />} />
  </Route>
);
