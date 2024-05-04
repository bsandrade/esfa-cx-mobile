import React, {ReactNode, createContext, useContext} from 'react';
import {ApiContextType} from './api-context.type';
import {ListProductsApi} from '@src/shared/services/api';
import {ApiException} from '@src/shared/exceptions/api-exceptions/api-exception';
import {InternalException} from '@src/shared/exceptions/api-exceptions';
import {useToastApp} from '../toast-app';

const ApiContext = createContext({} as ApiContextType);

type ApiProviderType = {
  children: ReactNode;
};

const ApiProvider = ({children}: ApiProviderType): JSX.Element => {
  const {toastError, toastWarning} = useToastApp();

  const errorHandler = (input: Error): void => {
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

  const listProducts = async () => {
    try {
      return await ListProductsApi.execute();
    } catch (err: any) {
      errorHandler(err);
      throw err;
    }
  };

  return (
    <ApiContext.Provider
      value={{
        listProducts,
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
