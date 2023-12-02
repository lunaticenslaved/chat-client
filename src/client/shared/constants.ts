export const constants = {
  IS_DEV: import.meta.env.DEV,
  CHAT_SERVER_URL: import.meta.env.VITE_CHAT_SERVER_URL,
  IS_SERVER_RENDERING: typeof window === 'undefined',
  IS_CLIENT_RENDERING: typeof window !== 'undefined',
  IS_SSR: typeof window !== 'undefined' && !!window.__IS_SSR__,
};

export default constants;
