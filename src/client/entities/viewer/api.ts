import Schema from '@lunaticenslaved/schema';
import {
  ActivateRequest,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '@lunaticenslaved/schema/actions';

import { api } from '@/shared/api';
import { Token } from '@/shared/token';

export type { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse, ActivateRequest };

export const ViewerAPI = {
  async signIn(data: SignInRequest): Promise<SignInResponse> {
    const response = await api.actions.auth.signIn({ data });
    Token.set(response);
    return response;
  },
  async signUp(data: SignUpRequest): Promise<SignUpResponse> {
    const response = await Schema.actions.auth.signUp({ data });
    Token.set(response);
    return response;
  },
  get() {
    return Schema.actions.viewer.get();
  },
  logout() {
    // return Schema.actions.auth.logout();
    return Promise.resolve();
  },
  repeatConfirmMail() {
    return Schema.actions.auth.resendEmail();
  },
  activateAccount(data: ActivateRequest) {
    return Schema.actions.auth.activate({ data });
  },
};
