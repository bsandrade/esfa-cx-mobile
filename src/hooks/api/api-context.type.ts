import {ListProductsResponseType} from '@src/types';

export type ApiContextType = {
  listProducts: () => Promise<ListProductsResponseType>;
};
