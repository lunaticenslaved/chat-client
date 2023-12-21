import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UsersState {
  onlineUsers: Record<string, boolean>;
}

const initialState: UsersState = {
  onlineUsers: {},
};

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserOnlineStatus(state, action: PayloadAction<{ id: string; status: boolean }>) {
      state.onlineUsers = {
        ...state.onlineUsers,
        [action.payload.id]: action.payload.status,
      };
    },
  },
});

const selectors = {
  selectUsers: (state: { users: UsersState }) => state.users.onlineUsers,
};

export const UsersStore = {
  slice,
  selectors,
  actions: slice.actions,
};
