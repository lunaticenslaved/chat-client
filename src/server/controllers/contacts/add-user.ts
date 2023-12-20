import { AddUserInContactsRequest, AddUserInContactsResponse } from '#/api/contact';
import { createOperation } from '#/server/context';
import { contactsPipe } from '#/server/pipes/contact';
import { contactsService } from '#/server/service/contacts';

export const addUser = createOperation<AddUserInContactsResponse, AddUserInContactsRequest>(
  async (req, requestContext) => {
    const { userId } = req.body;
    const ownerId = requestContext.userId;

    if (!ownerId) {
      // FIXME add function to request context to get user id strict
      throw new Error('User id not found');
    }

    const rawContact = await contactsService.addUser({ ownerId, userId });

    return {
      contact: await contactsPipe.fromServiceToDomain(requestContext, rawContact),
    };
  },
);
