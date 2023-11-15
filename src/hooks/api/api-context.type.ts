import {
  AuthRequestType,
  AuthResponseType,
  ListProductsResponseType,
} from '@src/types';

export type ApiContextType = {
  auth: (input: AuthRequestType) => Promise<AuthResponseType>;
  listProducts: () => Promise<ListProductsResponseType>;
  token: string | undefined;
};
