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
    replaceContact(state, action: PayloadAction<Contact>) {
      const index = state.contacts.findIndex(({ id }) => action.payload.id === id);

      console.log('replaceContact', action.payload);

      if (index > -1) {
        state.contacts = state.contacts.map((contact, idx) => {
          return index === idx ? action.payload : contact;
        });
      } else {
        state.contacts = [...state.contacts, action.payload];
      }
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
