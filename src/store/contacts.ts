import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Contact } from '#/domain/contact';

interface ContactsState {
  contacts: Contact[];
}

const initialState: ContactsState = {
  contacts: [],
};

const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts(state, action: PayloadAction<Contact[]>) {
      state.contacts = action.payload;
    },
    addContact(state, action: PayloadAction<Contact>) {
      state.contacts = [...state.contacts, action.payload];
    },
    removeContact(state, action: PayloadAction<Pick<Contact, 'id'>>) {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload.id);
    },
  },
});

const selectors = {
  selectContacts: (state: { contacts: ContactsState }) => state.contacts.contacts,
};

export const ContactsStore = {
  slice,
  selectors,
  actions: slice.actions,
};
