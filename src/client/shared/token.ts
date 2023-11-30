export const Token = {
  set(token: string) {
    console.log('TOKEN SET', !!token);
    localStorage.setItem('token', token);
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
