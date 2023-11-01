import React, {ReactNode} from 'react';
import {BluetoothProvider} from './bluetooth';
import {DefaultCustomTheme} from '@themes/default';
import {ThemeProvider} from 'styled-components/native';
import {ToastAppProvider} from './toast-app';
import {ToastProvider} from 'react-native-toast-notifications';
type HooksProps = {
  children: ReactNode;
};

export const Hooks = ({children}: HooksProps): JSX.Element => {
  return (
    <>
      <ThemeProvider theme={DefaultCustomTheme}>
        <ToastProvider>
          <ToastAppProvider>
            <BluetoothProvider>{children}</BluetoothProvider>
          </ToastAppProvider>
        </ToastProvider>
      </ThemeProvider>
    </>
  );
};
