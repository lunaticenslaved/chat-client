import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import { Viewer } from '../domain/viewer';

import { ContactsStore } from './contacts';
import { DialogsStore } from './dialog';
import { MessagesStore } from './messages';
import { SearchStore } from './search';
import { UsersStore } from './users';
import { ViewerStore } from './viewer';

export const createStore = (viewer?: Viewer) => {
  console.log('INITIAL USER', viewer);

  return configureStore({
    reducer: {
      [DialogsStore.slice.name]: DialogsStore.slice.reducer,
      [ViewerStore.slice.name]: ViewerStore.slice.reducer,
      [MessagesStore.slice.name]: MessagesStore.slice.reducer,
      [SearchStore.slice.name]: SearchStore.slice.reducer,
      [ContactsStore.slice.name]: ContactsStore.slice.reducer,
      [UsersStore.slice.name]: UsersStore.slice.reducer,
    },
    preloadedState: {
      viewer: {
        isOnline: false,
        viewer,
      },
    },
  });
};

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppState = ReturnType<AppStore['getState']>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const store = {
  [DialogsStore.slice.name]: DialogsStore,
  [ViewerStore.slice.name]: ViewerStore,
  [MessagesStore.slice.name]: MessagesStore,
  [SearchStore.slice.name]: SearchStore,
  [ContactsStore.slice.name]: ContactsStore,
  [UsersStore.slice.name]: UsersStore,
};
