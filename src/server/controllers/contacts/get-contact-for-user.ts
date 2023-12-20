import { GetContactForUserRequest, GetContactForUserResponse } from '#/api/contact';
import { createOperation } from '#/server/context';
import { contactsPipe } from '#/server/pipes/contact';
import { contactsService } from '#/server/service/contacts';

export const getContactForUser = createOperation<
  GetContactForUserResponse,
  GetContactForUserRequest
>(async ({ userId }, requestContext) => {
  const ownerId = requestContext.userId;

  if (!ownerId) {
    // FIXME add function to request context to get user id strict
    throw new Error('User id not found');
  }

  const rawContact = await contactsService.findOne({ ownerId, userId });

  return {
    contact: rawContact
      ? await contactsPipe.fromServiceToDomain(requestContext, rawContact)
      : undefined,
  };
});
