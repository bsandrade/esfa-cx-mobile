import React, {ReactNode, createContext, useContext} from 'react';
import {useToast} from 'react-native-toast-notifications';

type ToastAppContextType = {
  toastError: (input: string) => void;
  toastWarning: (input: string) => void;
  toastSuccess: (input: string) => void;
  toastInfo: (input: string) => void;
};

type ToastAppProviderType = {
  children: ReactNode;
};

const ToastAppContext = createContext({} as ToastAppContextType);

const ToastAppProvider = ({children}: ToastAppProviderType): JSX.Element => {
  const toast = useToast();

  function toastError(message: string) {
    toast.show(message, {
      type: 'danger',
      placement: 'bottom',
      duration: 4000,
      animationType: 'slide-in',
    });
  }

  function toastInfo(message: string) {
    toast.show(message, {
      type: 'normal',
      placement: 'bottom',
      duration: 4000,
      animationType: 'slide-in',
    });
  }

  function toastSuccess(message: string) {
    toast.show(message, {
      type: 'success',
      placement: 'bottom',
      duration: 4000,
      animationType: 'slide-in',
    });
  }

  function toastWarning(message: string) {
    toast.show(message, {
      type: 'warning',
      placement: 'bottom',
      duration: 4000,
      animationType: 'slide-in',
    });
  }

  return (
    <ToastAppContext.Provider
      value={{
        toastError,
        toastSuccess,
        toastInfo,
        toastWarning,
      }}>
      {children}
    </ToastAppContext.Provider>
  );
};

function useToastApp() {
  const context = useContext(ToastAppContext);
  return context;
}

export {ToastAppProvider, useToastApp};
