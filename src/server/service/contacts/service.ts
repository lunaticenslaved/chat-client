import { prisma } from '#/server/context';

import { BaseService } from '../base-service';

import {
  AddUserInContactsRequest,
  FindContactForUserRequest,
  IsUserInContactsCheckRequest,
  ListContactsRequest,
  UpdateContactRequest,
} from './types';
import { Contact, select } from './utils';

export class ContactsService extends BaseService {
  isUserInContacts({ ownerId, userId }: IsUserInContactsCheckRequest): Promise<boolean> {
    return prisma.contact
      .findFirst({
        where: { ownerId, userId },
      })
      .then(user => !!user);
  }

  addUser({ ownerId, userId }: AddUserInContactsRequest): Promise<Contact> {
    return prisma.contact.create({
      select,
      data: {
        ownerId,
        userId,
      },
    });
  }

  list({ ownerId }: ListContactsRequest): Promise<Contact[]> {
    return prisma.contact.findMany({
      select,
      where: { ownerId },
    });
  }

  async remove(contactId: string): Promise<void> {
    await prisma.contact.delete({
      where: { id: contactId },
    });
  }

  findOne({ ownerId, userId }: FindContactForUserRequest): Promise<Contact | undefined> {
    return prisma.contact
      .findFirst({
        select,
        where: {
          userId,
          ownerId,
        },
      })
      .then(data => data || undefined);
  }

  update({ contactId, name }: UpdateContactRequest): Promise<Contact> {
    return prisma.contact.update({
      select,
      where: { id: contactId },
      data: {
        name: { set: name },
      },
    });
  }
}
