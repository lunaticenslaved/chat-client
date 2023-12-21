import { UpdateContactRequest, UpdateContactResponse } from '#/api/contact';
import { createOperation } from '#/server/context';
import { contactsPipe } from '#/server/pipes/contact';
import { contactsService } from '#/server/service/contacts';

export const updateContact = createOperation<UpdateContactResponse, UpdateContactRequest>(
  async ({ contactId, name }, requestContext) => {
    requestContext.getUserIdStrict();

    const contact = await contactsService.update({ contactId, name });

    return {
      contact: await contactsPipe.fromServiceToDomain(requestContext, contact),
    };
  },
);
