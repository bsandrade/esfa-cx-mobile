import React, {ReactNode} from 'react';
import {BluetoothProvider} from './bluetooth';
import {DefaultCustomTheme} from '@themes/default';
import {ThemeProvider} from 'styled-components/native';

type HooksProps = {
  children: ReactNode;
};

export const Hooks = ({children}: HooksProps): JSX.Element => {
  return (
    <>
      <ThemeProvider theme={DefaultCustomTheme}>
        <BluetoothProvider>{children}</BluetoothProvider>
      </ThemeProvider>
    </>
  );
};
