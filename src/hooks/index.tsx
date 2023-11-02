import React, {ReactNode} from 'react';
import {BluetoothProvider} from './bluetooth';
import {DefaultCustomTheme} from '@themes/default';
import {ThemeProvider} from 'styled-components/native';
import {ToastAppProvider} from './toast-app';
import {ToastProvider} from 'react-native-toast-notifications';
import {RealmProvider} from './storage/realm';
import {StorageProvider} from './storage';
type HooksProps = {
  children: ReactNode;
};

export const Hooks = ({children}: HooksProps): JSX.Element => {
  return (
    <>
      <ThemeProvider theme={DefaultCustomTheme}>
        <ToastProvider>
          <ToastAppProvider>
            <RealmProvider>
              <StorageProvider>
                <BluetoothProvider>{children}</BluetoothProvider>
              </StorageProvider>
            </RealmProvider>
          </ToastAppProvider>
        </ToastProvider>
      </ThemeProvider>
    </>
  );
};
