import Schema, { ResponseUtils } from '@lunaticenslaved/schema';
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '@lunaticenslaved/schema/actions';

import { API } from '@/shared/api';
import { Token } from '@/shared/token';

export type { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse };

export const ViewerAPI = {
  async signIn(data: SignInRequest): Promise<SignInResponse> {
    const response = await Schema.actions.auth.signIn({ data }).then(ResponseUtils.unwrapResponse);

    Token.set(response.token);

    return response;
  },
  async signUp(data: SignUpRequest): Promise<SignUpResponse> {
    const response = await Schema.actions.auth.signIn({ data }).then(ResponseUtils.unwrapResponse);

    Token.set(response.token);

    return response;
  },
  async refresh() {
    const response = await Schema.actions.auth.refresh().then(ResponseUtils.unwrapResponse);

    Token.set(response.token);

    return response;
  },
  logout() {
    return API.request('/auth/logout', {
      method: 'POST',
    });
  },
  async repeatConfirmMail() {
    await Schema.actions.auth.resendEmail();
  },
  activateAccount() {
    return API.request('/auth/activate/:link', {
      method: 'POST',
    });
  },
};
