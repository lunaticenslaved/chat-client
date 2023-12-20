import { Contact as DomainContact } from '#/domain/contact';
import { Contact as ServiceContact } from '#/server/service/contacts';

import { IRequestContext } from '../shared/operation';

import { usersPipe } from './user';

class ContactsPipe {
  async fromServiceToDomain(
    request: IRequestContext,
    contact: ServiceContact,
  ): Promise<DomainContact> {
    return {
      id: contact.id,
      user: await usersPipe.fromServerToDomain(request, contact.user),
    };
  }
}

export const contactsPipe = new ContactsPipe();
