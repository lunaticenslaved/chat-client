import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UsersState {
  onlineUsers: Record<string, boolean>;
  blockedUsers: Record<string, boolean>;
  usersWhoBlockedMe: Record<string, boolean>;
}

const initialState: UsersState = {
  onlineUsers: {},
  blockedUsers: {},
  usersWhoBlockedMe: {},
};

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setBlockedUsers(state, action: PayloadAction<{ id: string }[]>) {
      const users: Record<string, boolean> = {};

      for (const { id } of action.payload) {
        users[id] = true;
      }

      state.blockedUsers = users;
    },
    setUsersWhoBlockedMe(state, action: PayloadAction<{ id: string }[]>) {
      const users: Record<string, boolean> = {};

      for (const { id } of action.payload) {
        users[id] = true;
      }

      state.usersWhoBlockedMe = users;
    },
    setUserOnlineStatus(state, action: PayloadAction<{ id: string; status: boolean }>) {
      state.onlineUsers = {
        ...state.onlineUsers,
        [action.payload.id]: action.payload.status,
      };
    },
    setStatusForBlockedUser(state, action: PayloadAction<{ id: string; status: boolean }>) {
      state.blockedUsers = {
        ...state.blockedUsers,
        [action.payload.id]: action.payload.status,
      };
    },
    setStatusForUserWhoBlockedMe(state, action: PayloadAction<{ id: string; status: boolean }>) {
      state.usersWhoBlockedMe = {
        ...state.usersWhoBlockedMe,
        [action.payload.id]: action.payload.status,
      };
    },
  },
});

const selectors = {
  selectOnlineUsers: (state: { users: UsersState }) => state.users.onlineUsers,
  selectBlockedUsers: (state: { users: UsersState }) => state.users.blockedUsers,
  selectUsersWhoBlockedMe: (state: { users: UsersState }) => state.users.usersWhoBlockedMe,
};

export const UsersStore = {
  slice,
  selectors,
  actions: slice.actions,
};
