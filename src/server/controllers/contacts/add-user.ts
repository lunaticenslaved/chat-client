import { AddUserInContactsRequest, AddUserInContactsResponse } from '#/api/contact';
import { createOperation } from '#/server/context';
import { contactsPipe } from '#/server/pipes/contact';
import { contactsService } from '#/server/service/contacts';

export const addUser = createOperation<AddUserInContactsResponse, AddUserInContactsRequest>(
  async ({ userId }, requestContext) => {
    const ownerId = requestContext.getUserIdStrict();
    const rawContact = await contactsService.addUser({ ownerId, userId });

    return {
      contact: await contactsPipe.fromServiceToDomain(requestContext, rawContact),
    };
  },
);
