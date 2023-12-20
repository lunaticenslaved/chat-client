import { RemoveContactRequest } from '#/api/contact';
import { createOperation } from '#/server/context';
import { contactsService } from '#/server/service/contacts';

export const remove = createOperation<void, RemoveContactRequest>(
  async (request, requestContext) => {
    const ownerId = requestContext.userId;
    const { contactId } = request.body;

    if (!ownerId) {
      // FIXME add function to request context to get user id strict
      throw new Error('User id not found');
    }

    await contactsService.remove(contactId);
  },
);
