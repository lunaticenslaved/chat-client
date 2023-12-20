import { client } from '../client';

import {
  AddUserInContactsRequest,
  AddUserInContactsResponse,
  GetContactForUserRequest,
  GetContactForUserResponse,
  ListContactsResponse,
  RemoveContactRequest,
  SearchContactsRequest,
  SearchContactsResponse,
} from './types';

export const actions = {
  listContacts: client.createAction<ListContactsResponse, void>({
    endpoint: 'chat-api',
    path: 'contacts/list',
  }),
  addUser: client.createAction<AddUserInContactsResponse, AddUserInContactsRequest>({
    endpoint: 'chat-api',
    path: 'contacts/add-user',
  }),
  getContactForUser: client.createAction<GetContactForUserResponse, GetContactForUserRequest>({
    endpoint: 'chat-api',
    path: 'contacts/get-for-user',
  }),
  removeContact: client.createAction<void, RemoveContactRequest>({
    endpoint: 'chat-api',
    path: 'contacts/remove',
  }),
  search: client.createAction<SearchContactsResponse, SearchContactsRequest>({
    endpoint: 'chat-api',
    path: 'contacts/search',
  }),
};
