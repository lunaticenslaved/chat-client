export interface SetTokenRequest {
  token: string;
  expiresAt: string;
}

export interface GetTokenResponse {
  token: string;
  expiresAt: Date;
}

export const Token = {
  set({ token, expiresAt }: SetTokenRequest) {
    if (typeof token === 'string') {
      localStorage.setItem('token', token);
      localStorage.setItem('expiresAt', expiresAt);
    }
  },
  remove() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
  },
  get(): GetTokenResponse {
    const token = localStorage.getItem('token') || '';
    const expiresAt = localStorage.getItem('expiresAt') || '';

    return {
      token,
      expiresAt: new Date(expiresAt),
    };
  },
  exists() {
    return !!localStorage.getItem('token');
  },
};
