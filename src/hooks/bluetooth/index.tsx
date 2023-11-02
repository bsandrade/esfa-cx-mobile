import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {BluetoothManager} from '@brooons/react-native-bluetooth-escpos-printer';
import {PaymentMethodType, PurchaseType} from '@src/types';
import {
  ALIGN,
  printAlign,
  printDivisor,
  printHeader,
  printLine,
  printLines,
  printQRCode,
  printSpaces,
  printerIsValid,
} from './utils/print.utils';
import {generateProductLine} from './utils/generate-product-line.utils';
import {formatCurrency} from '@src/utils';
import {useToastApp} from '../toast-app';

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
  isPrinting: boolean;
  scanDevices: () => Promise<void>;
  connectDevice: (id: string) => Promise<void>;
  connectedDevice: Device | null;
  disconnect: () => void;
  printPurchase: (input: PurchaseType) => Promise<void>;
  validatePrinter: () => Promise<boolean>;
};

type BluetoothProviderType = {
  children: ReactNode;
};

const BluetoothContext = createContext({} as BluetoothContextType);

const BluetoothProvider = ({children}: BluetoothProviderType): JSX.Element => {
  const [devices, setDevices] = useState<Array<Device>>([]);
  const [scanning, setScanning] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const {toastWarning, toastError} = useToastApp();

  async function bootstrap() {
    const isEnabled = await BluetoothManager.checkBluetoothEnabled();
    if (!isEnabled) {
      console.debug('[bluetooth disabled] > enable...');
      await BluetoothManager.enableBluetooth();
    } else {
      console.debug('[bluetooth enabled]');
    }
  }

  useEffect(() => {
    bootstrap()
      .then()
      .catch(err => {
        toastWarning(String(err?.message ?? err));
      });
  });

  const scanDevices = async () => {
    console.debug('[ble-scanDevices]');
    const bluetoothEnabled = await BluetoothManager.checkBluetoothEnabled();
    if (!bluetoothEnabled) {
      toastWarning('Bluetooth desativado');
    }
    setScanning(true);
    try {
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
      toastWarning(String(err));
    } finally {
      setScanning(false);
    }
  };

  const connectDevice = async (addres: string) => {
    const tempDevices = devices;
    const deviceIndex = tempDevices.findIndex(d => d.address === addres);
    if (deviceIndex < 0) {
    }
    if (tempDevices[deviceIndex].connected) {
      console.debug('[ble-device-already-connected]');
      setConnectedDevice(tempDevices[deviceIndex]);
      return;
    }
    try {
      if (connectedDevice) {
        console.debug('[ble-already-have-connected-device]');
        await BluetoothManager.disconnect(connectedDevice.address);
        setConnectedDevice(null);
      }

      tempDevices[deviceIndex].connecting = true;
      setDevices(tempDevices);
      await BluetoothManager.connect(addres);
      tempDevices[deviceIndex].connecting = false;
      tempDevices[deviceIndex].connected = true;
      setConnectedDevice(tempDevices[deviceIndex]);
    } catch (err) {
      toastWarning(String(err));
    } finally {
      tempDevices[deviceIndex].connecting = false;
      setDevices(tempDevices);
    }
  };

  const disconnect = async () => {
    console.debug('[ble-disconnect]');
    if (!connectedDevice) {
      toastWarning('Não há dispositivos conectados');
      return;
    }
    console.debug('[ble-disconnecting]');
    await BluetoothManager.disconnect(connectedDevice.address);
    console.debug('[ble-disconnecting-done]');
    const deviceIndex = devices.findIndex(
      d => d.address === connectedDevice.address,
    );
    if (deviceIndex < 0) {
      toastWarning('Ocorreu um erro ao encontrar o dispositivo na lista');
    }
    const tempDevices = devices;
    tempDevices[deviceIndex].connected = false;
    setDevices(tempDevices);
  };

  const validatePrinter = async () => {
    const isValid = await printerIsValid();
    if (!isValid || !connectedDevice) {
      return false;
    }
    return true;
  };

  const printPurchase = async (input: PurchaseType) => {
    console.debug('[ble-print-purchase]');
    const isValid = await validatePrinter();
    if (!isValid) {
      toastWarning('Impressora não conectada / Erro ao conectar');
      return;
    }
    try {
      setIsPrinting(true);
      // await printHeader();
      // await printLines(
      //   ...input.products.map(product => generateProductLine(product)),
      // );
      // await printDivisor(2);
      // const total = input.products.reduce((prev, curr) => {
      //   return prev + curr.quantity * curr.price;
      // }, 0);
      // await printLine(
      //   `Total: ${formatCurrency(total)} - ${input.paymentMethod}`,
      // );
      // if (input.paymentMethod === PaymentMethodType.MONEY && input.paidValue) {
      //   await printLine(
      //     `Dinheiro: ${formatCurrency(
      //       input.paidValue,
      //     )}\nTroco: ${formatCurrency(input.paidValue - total)}`,
      //   );
      // }
      await printDivisor(2);
      // await printLine(`Operador: ${input.user}`);
      // await printLine(`ID da operação:\n${input.id}`);
      // await printDivisor(2);
      // await printAlign(ALIGN.CENTER);
      // await printLine(
      //   'Leia o QR Code e acesse o perfil do externato no insta:',
      // );
      // await printQRCode(
      //   'https://www.instagram.com/externatosaofrancisco_oficial',
      // );
      // await printSpaces(2);
      // setIsPrinting(false);
      console.debug('[ble-print-success]');
    } catch (err) {
      toastError(String(err));
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <BluetoothContext.Provider
      value={{
        connectDevice,
        connectedDevice,
        devices,
        disconnect,
        printPurchase,
        scanDevices,
        scanning,
        isPrinting,
        validatePrinter,
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
