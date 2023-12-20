import { lazy } from 'react';
import { Route } from 'react-router-dom';

import { withLoadPage } from '#/client/shared/hoc/loadPage';

import { ContactsLayout } from './layout';

const Index = withLoadPage(lazy(() => import('./page-index')));

export const contactsRouter = (
  <Route path="/contacts" element={<ContactsLayout />}>
    <Route index element={<Index />} />
  </Route>
);
