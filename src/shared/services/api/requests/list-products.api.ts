import {ListProductsResponseType} from '@src/types';
import {api} from '../utils/api';
import {apiErrorCatch} from '../utils/api-error-catch';
import {AxiosError} from 'axios';

export class ListProductsApi {
  static async execute(): Promise<ListProductsResponseType> {
    const response = await api.get('/v1/products').catch((err: AxiosError) => {
      apiErrorCatch(err);
    });

    return response.data as ListProductsResponseType;
  }
}
