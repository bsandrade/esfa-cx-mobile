import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Buffer} from 'buffer';
import {
  BluetoothEscposPrinter,
  BluetoothManager,
} from '@brooons/react-native-bluetooth-escpos-printer';
import RNQRGenerator from 'rn-qr-generator';
const x = {
  found: [
    {address: 'F8:53:AB:74:12:67', name: 'BT01'},
    {address: '28:D3:A9:9C:C8:77', name: 'BT01'},
    {address: '72:95:D9:66:7F:48', name: 'SP350'},
  ],
  paired: [
    {address: '9C:19:C2:35:09:CF', name: 'Redmi AirDots 3'},
    {address: '41:42:A0:DC:86:AC', name: 'Amvox 280 Black'},
    {address: '70:70:AA:75:3D:78', name: 'Echo Dot-BWN'},
    {address: 'B4:E6:2A:C3:9B:20', name: 'HB20'},
    {address: '1C:93:C4:35:76:FD', name: 'Echo Dot-NJA'},
    {address: 'DC:0D:30:61:5F:0A', name: 'KP-1025'},
    {address: '54:15:89:03:DD:8B', name: 'JBL PartyBox 100'},
  ],
};
type ScanDeviceOutput = {
  found: Array<Device>;
  paired: Array<Device>;
};

export type Device = {
  address: string;
  name: string;
  paired: boolean;
  connected: boolean;
  connecting: boolean;
};

type BluetoothContextType = {
  devices: Array<Device>;
  scanning: boolean;
  scanDevices: () => Promise<void>;
  connectDevice: (id: string) => Promise<void>;
  connectedDevice: Device | null;
  disconnect: () => void;
  printString: (input: string) => Promise<void>;
  printBuffer: (input: Buffer) => Promise<void>;
};

type BluetoothProviderType = {
  children: ReactNode;
};

// const bluetoothManagerModule = NativeModules.BleManager;
// const bluetoothManagerEmitter = new NativeEventEmitter(bluetoothManagerModule);

const BluetoothContext = createContext({} as BluetoothContextType);

const BluetoothProvider = ({children}: BluetoothProviderType): JSX.Element => {
  const [devices, setDevices] = useState<Array<Device>>([]);
  const [scanning, setScanning] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

  async function bootstrap() {
    const isEnabled = await BluetoothManager.checkBluetoothEnabled();
    if (!isEnabled) {
      console.debug('[bluetooth disabled] > enable...');
      const devices = await BluetoothManager.enableBluetooth();

      console.debug('devices');
      console.debug(devices);
      if (devices) {
        // const response = devices
        //   .reduce((acc, device) => {
        //     try {
        //       return [...acc, JSON.parse(device)];
        //     } catch (e) {
        //       return acc;
        //     }
        //   }, [])
        //   .filter(device => device.address);
      }
    } else {
      console.debug('[bluetooth enabled]');
    }
  }

  useEffect(() => {
    bootstrap()
      .then()
      .catch(err => {
        throw err;
      });
  });

  const scanDevices = async () => {
    setScanning(true);
    try {
      console.debug('[ble-scanDevices]');
      const r = await BluetoothManager.scanDevices();
      const data = JSON.parse(r) as ScanDeviceOutput;
      const newDevices: Array<Device> = [];
      data.found.forEach(device => {
        newDevices.push({
          address: device.address,
          name: device.name,
          paired: false,
          connected: false,
          connecting: false,
        });
      });
      data.paired.forEach(device => {
        newDevices.push({
          address: device.address,
          name: device.name,
          paired: true,
          connected: false,
          connecting: false,
        });
      });

      console.debug(data);
      const connectedDevices =
        await BluetoothManager.getConnectedDeviceAddress();
      console.debug(connectedDevices);

      setDevices(newDevices);
    } catch (err) {
      throw err;
    } finally {
      setScanning(false);
    }
  };

  const connectDevice = async (addres: string) => {
    const tempDevices = devices;
    const deviceIndex = tempDevices.findIndex(d => d.address === addres);
    if (deviceIndex < 0) {
      throw new Error('Dispositivo não encontrado');
    }
    try {
      if (tempDevices[deviceIndex].connected) {
        console.debug('[ble-device-already-connected]');
        await BluetoothManager.disconnect(addres);
        tempDevices[deviceIndex].connected = false;
        setConnectedDevice(null);
        setDevices(tempDevices);
      } else {
        if (connectedDevice) {
          await BluetoothManager.disconnect(connectedDevice.address);
          setConnectedDevice(null);
        }
      }

      tempDevices[deviceIndex].connecting = true;
      setDevices(tempDevices);
      await BluetoothManager.connect(addres);
      tempDevices[deviceIndex].connecting = false;
      tempDevices[deviceIndex].connected = true;
      setConnectedDevice(tempDevices[deviceIndex]);
    } catch (err) {
      throw err;
    } finally {
      tempDevices[deviceIndex].connecting = false;
      setDevices(tempDevices);
    }
  };

  const disconnect = async () => {
    console.debug('[ble-disconnect]');
    if (!connectedDevice) {
      throw new Error('Não há dispositivos conectados');
    }
    console.debug('[ble-disconnecting]');
    await BluetoothManager.disconnect(connectedDevice.address);
    console.debug('[ble-disconnecting-done]');
    const deviceIndex = devices.findIndex(
      d => d.address === connectedDevice.address,
    );
    if (deviceIndex < 0) {
      throw new Error('Ocorreu um erro ao encontrar o dispositivo na lista');
    }
    const tempDevices = devices;
    tempDevices[deviceIndex].connected = false;
    setDevices(tempDevices);
  };

  const printString = async () => {
    console.debug('[ble-print]');
    // await BluetoothEscposPrinter.printText(
    //   'Eduarda Jamile Gomes Santos\n\n\n',
    //   {
    //     encoding: 'UTF8',
    //   },
    // ); // OK
    // await BluetoothEscposPrinter.printBarCode(
    //   '123456789012',
    //   BluetoothEscposPrinter.BARCODETYPE.JAN13,
    //   3,
    //   120,
    //   0,
    //   2,
    // );
    // await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});

    const {base64} = (await RNQRGenerator.generate({
      value: 'http://www.brunosana.com.br',
      height: 200,
      width: 200,
      correctionLevel: 'H',
      base64: true,
    })) as {base64: string};

    await BluetoothEscposPrinter.printPic(base64, {width: 200, left: 85});
    await BluetoothEscposPrinter.printText('\n', {});
    console.debug('[ble-print-success]');
  };

  return (
    <BluetoothContext.Provider
      value={{
        connectDevice,
        connectedDevice,
        devices,
        disconnect,
        printString,
        scanDevices,
        scanning,
        printBuffer: null as any,
      }}>
      {children}
    </BluetoothContext.Provider>
  );
};

function useBluetooth() {
  const context = useContext(BluetoothContext);
  return context;
}

export {BluetoothProvider, useBluetooth};
