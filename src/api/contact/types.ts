import { Contact } from '#/domain/contact';
import { User } from '#/domain/user';

export interface AddUserInContactsRequest {
  userId: string;
}
export interface AddUserInContactsResponse {
  contact: Contact;
}

export interface ListContactsResponse {
  contacts: Contact[];
}

export interface RemoveContactRequest {
  contactId: string;
}

export interface SearchContactsRequest {
  search: string;
}
export interface SearchContactsResponse {
  myContacts: Contact[];
  users: User[];
}

export interface GetContactForUserResponse {
  contact?: Contact;
}
export interface GetContactForUserRequest {
  userId: string;
}
