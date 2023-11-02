import React, {useState} from 'react';
import {
  ConnectingIndicator,
  ConnectionDetails,
  Container,
  Content,
  DetailsInfo,
  DeviceDetails,
  DeviceHead,
  DeviceName,
  DeviceSubInfo,
  DeviceSubInfoSection,
} from './styles';
import {useTheme} from 'styled-components/native';
import {Device} from '@hooks/bluetooth';

type DeviceItemProps = {
  device: Device;
  connectDevice: () => void;
  disconnectDevice: () => void;
};

export const DeviceItem = ({
  device,
  connectDevice,
  disconnectDevice,
}: DeviceItemProps): JSX.Element => {
  const theme = useTheme();
  const connected = !!device.connected;

  return (
    <Container
      activeOpacity={0.4}
      isConnected={connected}
      isConnecting={device.connecting}
      onPress={() => {
        connected ? disconnectDevice() : connectDevice();
      }}
      disabled={!!device.connecting}>
      <Content>
        <DeviceHead>
          <DeviceName isConnected={connected}>
            {device.name ?? 'Nome não encontrado'}
          </DeviceName>
        </DeviceHead>
        <DeviceSubInfoSection>
          <DeviceSubInfo isConnected={connected}>
            {device.paired ? 'Pareado' : 'Não pareado'}
          </DeviceSubInfo>
        </DeviceSubInfoSection>
        <DeviceDetails>
          <DetailsInfo isConnected={connected}>
            id: {device.address ?? 'id n/a'}
          </DetailsInfo>
          <ConnectionDetails>
            {!device.connecting && (
              <DetailsInfo isConnected={connected}>
                {connected ? 'conectado' : 'não conectado'}
              </DetailsInfo>
            )}
            {!!device.connecting && (
              <>
                <DetailsInfo>conectando</DetailsInfo>
                <ConnectingIndicator
                  size={12}
                  color={theme.colors.text.primary}
                />
              </>
            )}
          </ConnectionDetails>
        </DeviceDetails>
      </Content>
    </Container>
  );
};
