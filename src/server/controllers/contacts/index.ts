import { utils } from '#/server/shared';

import { addUser } from './add-user';
import { getContactForUser } from './get-contact-for-user';
import { list } from './list';
import { remove } from './remove';
import { search } from './search';
import { updateContact } from './update';

export const addContactsRoutes = utils.app.createRoutes(app => {
  app.post('/api/contacts/get-for-user', getContactForUser);
  app.post('/api/contacts/add-user', addUser);
  app.post('/api/contacts/list', list);
  app.post('/api/contacts/search', search);
  app.post('/api/contacts/remove', remove);
  app.post('/api/contacts/update', updateContact);
});
