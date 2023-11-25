import Schema, { ResponseUtils } from '@lunaticenslaved/schema';
import {
  ActivateRequest,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '@lunaticenslaved/schema/actions';

import { Token } from '@/shared/token';

export type { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse, ActivateRequest };

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
  get() {
    return Schema.actions.viewer.get().then(ResponseUtils.unwrapResponse);
  },
  logout() {
    return Schema.actions.auth.logout();
  },
  repeatConfirmMail() {
    return Schema.actions.auth.resendEmail();
  },
  activateAccount(data: ActivateRequest) {
    return Schema.actions.auth.activate({ data }).then(ResponseUtils.unwrapResponse);
  },
};
