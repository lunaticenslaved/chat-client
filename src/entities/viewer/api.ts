import { Operation, ResponseUtils } from '@lunaticenslaved/schema';

import { ViewerModel } from './types';
import { API } from '@/shared/api';
import { Token } from '@/shared/token';

export namespace ViewerAPI {
  export type SignInRequest = Operation.Auth.SignInRequest;
  export type SignInResponse = Operation.Auth.SignInResponse;

  export type SignUpRequest = Operation.Auth.SignUpRequest;
  export type SignUpResponse = Operation.Auth.SignUpResponse;

  export interface RefreshResponse {
    user: ViewerModel;
  }
}

export const ViewerAPI = {
  async signIn(data: ViewerAPI.SignInRequest): Promise<ViewerAPI.SignInResponse> {
    const response = await Operation.Auth.SignIn.action({
      data,
    }).then(ResponseUtils.unwrapResponse);

    Token.set(response.token);

    return response;
  },
  async signUp(data: ViewerAPI.SignUpRequest): Promise<ViewerAPI.SignUpResponse> {
    const response = await Operation.Auth.SignUp.action({
      data,
    }).then(ResponseUtils.unwrapResponse);

    Token.set(response.token);

    return response;
  },
  async refresh() {
    const response = await Operation.Auth.Refresh.action().then(ResponseUtils.unwrapResponse);

    Token.set(response.token);

    return response;
  },
  logout() {
    return API.request('/auth/logout', {
      method: 'POST',
    });
  },
  repeatConfirmMail() {
    return API.request('/auth/repeat-confirm-email', {
      method: 'POST',
    });
  },
  activateAccount() {
    return API.request('/auth/activate/:link', {
      method: 'POST',
    });
  },
};
