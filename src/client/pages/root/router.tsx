import { Route } from 'react-router-dom';

import { ContactsContext } from '#/client/features/contacts';

import { chatRouter } from './chat/router';
import { contactsRouter } from './contacts/router';
import { RootLayout } from './layout';
import { settingsRouter } from './settings/router';

export const rootRouter = (
  <Route
    element={
      <ContactsContext>
        <RootLayout />
      </ContactsContext>
    }>
    {chatRouter}
    {settingsRouter}
    {contactsRouter}
  </Route>
);
