export const Token = {
  set(token: string) {
    localStorage.setItem('token', token);
  },
  remove() {
    localStorage.removeItem('token');
  },
};
