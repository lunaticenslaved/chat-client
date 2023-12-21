import { RemoveContactRequest } from '#/api/contact';
import { createOperation } from '#/server/context';
import { contactsService } from '#/server/service/contacts';

export const remove = createOperation<void, RemoveContactRequest>(
  async ({ contactId }, requestContext) => {
    requestContext.getUserIdStrict();

    await contactsService.remove(contactId);
  },
);
