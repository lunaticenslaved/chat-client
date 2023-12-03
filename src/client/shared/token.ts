export const Token = {
  set(token: string) {
    if (typeof token === 'string') {
      localStorage.setItem('token', token);
    }
  },
  remove() {
    localStorage.removeItem('token');
  },
  get() {
    return localStorage.getItem('token');
  },
  exists() {
    return !!localStorage.getItem('token');
  },
};
