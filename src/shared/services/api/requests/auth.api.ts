import {AuthRequestType, AuthResponseType} from '@src/types';
import {api} from '../utils/api';
import {apiErrorCatch} from '../utils/api-error-catch';
import {AxiosError} from 'axios';

export class AuthApi {
  static async execute({id}: AuthRequestType): Promise<AuthResponseType> {
    const response = await api
      .post('/v1/auth/google', {
        googleId: id,
      })
      .catch((err: AxiosError) => {
        apiErrorCatch(err);
      });

    return response.data as AuthResponseType;
  }
}
