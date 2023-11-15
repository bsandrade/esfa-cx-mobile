import React, {ReactNode, createContext, useContext, useState} from 'react';
import {ApiContextType} from './api-context.type';
import {AuthRequestType} from '@src/types';
import {AuthApi, ListProductsApi} from '@src/shared/services/api';
import {ApiException} from '@src/shared/exceptions/api-exceptions/api-exception';
import {
  AuthException,
  InternalException,
} from '@src/shared/exceptions/api-exceptions';
import {useToastApp} from '../toast-app';

const ApiContext = createContext({} as ApiContextType);

type ApiProviderType = {
  children: ReactNode;
};

const ApiProvider = ({children}: ApiProviderType): JSX.Element => {
  const {toastError, toastWarning} = useToastApp();
  const [token, setToken] = useState<string>();

  const errorHandler = (input: Error): void => {
    if (input instanceof AuthException) {
      setToken(undefined);
      return;
    }

    if (input instanceof InternalException) {
      toastError(input.message);
      return;
    }

    if (input instanceof ApiException) {
      toastWarning(input.message);
      return;
    }

    console.debug(input);
    toastError('Ocorreu um erro, tente novamente');
  };

  const auth = async (input: AuthRequestType) => {
    try {
      const response = await AuthApi.execute(input);
      setToken(response.token);
      return response;
    } catch (err: any) {
      errorHandler(err);
      throw err;
    }
  };

  const listProducts = async () => {
    try {
      return await ListProductsApi.execute(token);
    } catch (err: any) {
      errorHandler(err);
      throw err;
    }
  };

  return (
    <ApiContext.Provider
      value={{
        auth,
        listProducts,
        token,
      }}>
      {children}
    </ApiContext.Provider>
  );
};

function useApi() {
  const context = useContext(ApiContext);
  return context;
}

export {ApiProvider, useApi};
