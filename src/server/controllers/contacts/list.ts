import { ListContactsResponse } from '#/api/contact';
import { createOperation } from '#/server/context';
import { contactsPipe } from '#/server/pipes/contact';
import { contactsService } from '#/server/service/contacts';

export const list = createOperation<ListContactsResponse, void>(async (_, requestContext) => {
  const ownerId = requestContext.userId;

  if (!ownerId) {
    // FIXME add function to request context to get user id strict
    throw new Error('User id not found');
  }

  const rawContacts = await contactsService.list({ ownerId });

  return {
    contacts: await Promise.all(
      rawContacts.map(contact => contactsPipe.fromServiceToDomain(requestContext, contact)),
    ),
  };
});
