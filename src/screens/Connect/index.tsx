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

const straaingTeste =
  'SAIA DAQUI NÃO\nSAIA DAQUI SIM\nSAI DAQUI COM CERTEZA\n SAIA DAQUI NÃO\n SAIA DAQUI SIM...\n...\nSAIA DAQUI NÃO\n SAIA DAQUI SIIIIIIIIIIIIMMM\nSIM, SIM, SAIA DAQUI SIM\n\n\n\n\n\n';
export const ConnectScreen = (): JSX.Element => {
  const {
    devices,
    scanning,
    scanDevices,
    connectDevice,
    disconnect,
    printContent,
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
        onPress={scanDevices}
        Animation={
          scanning ? (
            <ScanningIndicator color={theme.colors.background} size={20} />
          ) : undefined
        }
      />
      <DeviceList
        data={Array.from(devices.values())}
        renderItem={it => (
          <DeviceItem
            connectDevice={async () => await connectDevice(it.item.id)}
            disconnectDevice={async () => disconnect}
            key={it.item.id}
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
        onPress={() => printContent(`${stringTeste}\n\n\n`)}
      />
    </Container>
  );
};
