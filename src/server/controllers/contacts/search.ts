import schema from '@lunaticenslaved/schema';

import { SearchContactsRequest, SearchContactsResponse } from '#/api/contact';
import { createOperation } from '#/server/context';
import { contactsPipe } from '#/server/pipes/contact';
import { contactsService } from '#/server/service/contacts';

export const search = createOperation<SearchContactsResponse, SearchContactsRequest>(
  async ({ search }, requestContext) => {
    const ownerId = requestContext.getUserIdStrict();
    const rawContacts = await contactsService.list({ ownerId });
    const userIdsFromContacts = rawContacts.map(({ user }) => user.id);
    const contactsUsers = await schema.actions.users
      .list({
        token: requestContext.token,
        data: { search, userIds: userIdsFromContacts, services: ['chat'] },
        config: {
          headers: {
            origin: requestContext.origin,
          },
        },
      })
      .then(({ users }) => new Set(users.map(({ id }) => id)));
    const contacts = rawContacts.filter(({ user }) => contactsUsers.has(user.id));

    return {
      myContacts: await Promise.all(
        contacts.map(contact => contactsPipe.fromServiceToDomain(requestContext, contact)),
      ),
      users: await schema.actions.users
        .list({
          token: requestContext.token,
          data: {
            take: 5,
            search,
            services: ['chat'],
            excludeIds: [ownerId, ...userIdsFromContacts],
          },
          config: {
            headers: {
              origin: requestContext.origin,
            },
          },
        })
        .then(({ users }) => users),
    };
  },
);
