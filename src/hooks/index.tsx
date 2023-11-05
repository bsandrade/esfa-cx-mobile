import React, {ReactNode} from 'react';
import {BluetoothProvider} from './bluetooth';
import {DefaultCustomTheme} from '@themes/default';
import {ThemeProvider} from 'styled-components/native';
import {ToastAppProvider} from './toast-app';
import {ToastProvider} from 'react-native-toast-notifications';
import {RealmProvider} from './storage/realm';
import {StorageProvider} from './storage';
import {SessionProvider} from './session';
import {SecretsProvider} from './secrets';
type HooksProps = {
  children: ReactNode;
};

export const Hooks = ({children}: HooksProps): JSX.Element => {
  return (
    <>
      <ThemeProvider theme={DefaultCustomTheme}>
        <SecretsProvider>
          <ToastProvider>
            <ToastAppProvider>
              <SessionProvider>
                <RealmProvider>
                  <StorageProvider>
                    <BluetoothProvider>{children}</BluetoothProvider>
                  </StorageProvider>
                </RealmProvider>
              </SessionProvider>
            </ToastAppProvider>
          </ToastProvider>
        </SecretsProvider>
      </ThemeProvider>
    </>
  );
};
