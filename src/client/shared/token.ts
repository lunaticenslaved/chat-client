export interface SetTokenRequest {
  token: string;
  expiresAt: string;
}

export interface GetTokenResponse {
  token: string;
  expiresAt: Date;
}

type TokenListener = (token: string | undefined) => void;

export const Token = {
  set({ token, expiresAt }: SetTokenRequest) {
    if (typeof token === 'string') {
      localStorage?.setItem('token', token);
      localStorage?.setItem('expiresAt', expiresAt);

      this._handleTokenUpdate(token);
    }
  },
  remove() {
    localStorage?.removeItem('token');
    localStorage?.removeItem('expiresAt');

    this._handleTokenUpdate(undefined);
  },
  get(): GetTokenResponse {
    const token = localStorage?.getItem('token') || '';
    const expiresAt = localStorage?.getItem('expiresAt') || '';

    return {
      token,
      expiresAt: new Date(expiresAt),
    };
  },
  exists() {
    return !!localStorage?.getItem('token');
  },

  _listeners: [] as TokenListener[],
  _handleTokenUpdate(token: string | undefined) {
    for (const fn of this._listeners) {
      fn(token);
    }
  },
  removeOnTokenUpdate(fn: TokenListener) {
    this._listeners = this._listeners.filter(f => f !== fn);
  },
  listenTokenUpdate(fn: TokenListener) {
    this._listeners.push(fn);
  },
};
