import { AppState } from '@common/store';

declare global {
  interface Window {
    __INITIAL_STATE__?: AppState;
    __IS_SSR__?: boolean;
  }
}
