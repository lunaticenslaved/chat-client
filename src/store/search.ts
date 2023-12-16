import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { User } from '#/domain/user';

interface SearchState {
  searchQuery?: string;
  selectedUser?: User;
}

const initialState: SearchState = {
  searchQuery: '',
};

const slice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string | undefined>) {
      state.searchQuery = action.payload;
    },
    setSelectedUser(state, action: PayloadAction<User | undefined>) {
      state.selectedUser = action.payload;
    },
  },
});

const selectors = {
  selectQuery: (state: { search: SearchState }) => state.search.searchQuery,
  selectUser: (state: { search: SearchState }) => state.search.selectedUser,
};

export const SearchStore = {
  slice,
  selectors,
  actions: slice.actions,
};
