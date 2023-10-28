import React, {useState} from 'react';
import {
  Container,
  DeviceList,
  DeviceSeparator,
  ScanButton,
  ScanningIndicator,
} from './styles';
import {TopBar} from '@components/TopBar';
import {DeviceItem} from '@components/Bluetooth/DeviceItem';
import {useBluetooth} from '@src/hooks/bluetooth';
import {useTheme} from 'styled-components/native';
import {TextInput} from 'react-native';

export const ConnectScreen = (): JSX.Element => {
  const {
    devices,
    scanning,
    scanDevices,
    connectDevice,
    disconnect,
    printString,
    printBuffer,
  } = useBluetooth();
  const theme = useTheme();
  console.log('---------------------------------------');

  const [stringTeste, setStringTeste] = useState('');

  return (
    <Container>
      <TopBar
        rightIconName="close"
        leftIconName="close"
        name="Conectar a uma Impressora"
      />
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
            disconnectDevice={async () => disconnect}
            key={it.item.address}
            device={it.item}
          />
        )}
        ItemSeparatorComponent={DeviceSeparator}
      />
      <TextInput
        value={stringTeste}
        onChangeText={e => setStringTeste(e)}
        style={{
          borderColor: '#ddd',
          borderWidth: 2,
          borderRadius: 8,
          marginBottom: 15,
          color: '#000',
        }}
      />
      <ScanButton
        name={'testar'}
        onPress={async () => {
          printString('');
        }}
      />
    </Container>
  );
};
