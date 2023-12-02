export const constants = {
  IS_DEV: import.meta.env.DEV,
  IS_SERVER_RENDERING: typeof window === 'undefined',
  IS_CLIENT_RENDERING: typeof window !== 'undefined',
  IS_SSR: typeof window !== 'undefined' && !!window.__IS_SSR__,
};

export default constants;
