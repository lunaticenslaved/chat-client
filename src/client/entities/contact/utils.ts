import { Contact } from '#/domain/contact';

export function getContactName(contact: Contact) {
  return contact.name || contact.user.login;
}
