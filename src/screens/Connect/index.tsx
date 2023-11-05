import React from 'react';
import {
  Container,
  DeviceList,
  DeviceSeparator,
  ScanButton,
  ScanningIndicator,
} from './styles';
import {TopBar} from '@components/TopBar';
import {DeviceItem} from '@components/Bluetooth/DeviceItem';
import {useBluetooth} from '@hooks/bluetooth';
import {useTheme} from 'styled-components/native';
import {NavigationType, ScreenProps} from '@src/types';

export const ConnectScreen = ({
  navigation,
  route,
}: ScreenProps): JSX.Element => {
  const {
    devices,
    scanning,
    scanDevices,
    connectDevice,
    disconnect,
    connectedDevice,
  } = useBluetooth();
  const theme = useTheme();

  return (
    <Container>
      <TopBar name="Conectar-se à Impressora" />
      <ScanButton
        name={scanning ? 'Procurando...' : 'Procurar'}
        onPress={async () => await scanDevices()}
        Animation={
          scanning ? (
            <ScanningIndicator color={theme.colors.background} size={20} />
          ) : undefined
        }
      />
      <DeviceList
        data={devices}
        renderItem={it => (
          <DeviceItem
            connectDevice={async () => await connectDevice(it.item.address)}
            disconnectDevice={disconnect}
            key={it.item.address}
            device={it.item}
          />
        )}
        ItemSeparatorComponent={DeviceSeparator}
      />
      {connectedDevice && (
        <ScanButton
          name="Voltar"
          onPress={() => {
            const navigateRoute =
              route?.params?.goBack ?? NavigationType.PROFILE;
            navigation?.navigate(navigateRoute, {
              ...route?.params,
              goBack: NavigationType.CONNECT,
            });
          }}
        />
      )}
    </Container>
  );
};
