import {ListProductsResponseType} from '@src/types';
import {api} from '../utils/api';
import {apiErrorCatch} from '../utils/api-error-catch';
import {AuthException} from '@src/shared/exceptions/api-exceptions';
import {AxiosError} from 'axios';

export class ListProductsApi {
  static async execute(token?: string): Promise<ListProductsResponseType> {
    if (!token) {
      throw new AuthException();
    }
    const response = await api
      .get('/v1/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err: AxiosError) => {
        apiErrorCatch(err);
      });

    return response.data as ListProductsResponseType;
  }
}
