import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {BluetoothManager} from '@brooons/react-native-bluetooth-escpos-printer';
import {PaymentMethodType, ProductItemType, PurchaseType} from '@src/types';
import {
  ALIGN,
  printAlign,
  printDivisor,
  printHeader,
  printLine,
  printLines,
  printQRCode,
  printReportHeader,
  printSpaces,
  printerIsValid,
} from './utils/print.utils';
import {generateProductLine} from './utils/generate-product-line.utils';
import {formatCurrency, translatedPaymentMethod} from '@src/utils';
import {useToastApp} from '../toast-app';
import {useSession} from '../session';
import {useStorage} from '../storage';
import {generateReportLine} from './utils/generate-report-line.utils';

type CheckDevices = {
  name: string;
  address: string;
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

export type PrintPurchaseType = PurchaseType & {reprint?: boolean};

type BluetoothContextType = {
  devices: Array<Device>;
  scanning: boolean;
  isPrinting: boolean;
  scanDevices: () => Promise<void>;
  connectDevice: (id: string) => Promise<void>;
  connectedDevice: Device | null;
  disconnect: () => void;
  printPurchase: (input: PrintPurchaseType) => Promise<void>;
  printReport: (input: Array<PurchaseType>) => Promise<void>;
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

  const {userData} = useSession();
  const {setDevice, getDevices} = useStorage();

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
      setDevice({
        address: tempDevices[deviceIndex].address,
      });
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

  const connectAttempt = async (address: string): Promise<string> => {
    try {
      await BluetoothManager.connect(address);
      return 'true';
    } catch (err) {}
    try {
      await BluetoothManager.connect(address);
      return 'true';
    } catch (err) {
      return 'error';
    }
  };

  const connectAndTest = async (input: CheckDevices) => {
    const checkConnect = await connectAttempt(input.address);
    if (checkConnect === 'error') {
      return false;
    }
    const isValidCheck = await printerIsValid();
    if (isValidCheck) {
      setDevice({address: input.address});
      setConnectedDevice({
        address: input.address,
        name: input.name,
        connected: true,
        connecting: false,
        paired: true,
      });
      return true;
    }
    return false;
  };

  const validatePrinter = async () => {
    console.debug('[ble-validate-printer]');
    const isValid = await printerIsValid();
    if (!isValid || !connectedDevice) {
      console.debug('[ble-validate-not-valid]');
      const storageDevices = getDevices();
      console.debug('storaged', storageDevices);

      const response = await BluetoothManager.enableBluetooth();
      if (!response) {
        return false;
      }
      const newDevices: Array<CheckDevices> = response.map(dev => {
        return JSON.parse(dev);
      });

      const lastDeviceConnected = storageDevices.find(
        dev => dev.lastConnected === true,
      );

      console.debug('[ble-has-last-connected-device]');

      if (
        lastDeviceConnected &&
        newDevices.find(dev => dev.address === lastDeviceConnected.address)
      ) {
        const device = newDevices.find(
          dev => dev.address === lastDeviceConnected.address,
        ) as CheckDevices;
        if (await connectAndTest(device)) {
          console.debug('[ble-connected-with-attempt]');
          return true;
        }
      }

      const commonDevices = newDevices.filter(
        newDev =>
          storageDevices.findIndex(dev => dev.address === newDev.address) >= 0,
      );
      for (const device of commonDevices) {
        if (await connectAndTest(device)) {
          return true;
        }
      }

      return false;
    }

    if (connectedDevice) {
      setDevice({
        address: connectedDevice.address,
      });
    }
    return true;
  };

  const handleGetTotal = (input: Array<PurchaseType>) => {
    return input.reduce((prev, curr) => {
      const tempTotal = curr.products.reduce((prev, curr) => {
        return prev + curr.quantity * curr.price;
      }, 0);
      return prev + tempTotal;
    }, 0);
  };

  const printReport = async (input: Array<PurchaseType>) => {
    const pixOperations = input.filter(
      op => op.paymentMethod === PaymentMethodType.PIX,
    );
    const cardOperations = input.filter(
      op => op.paymentMethod === PaymentMethodType.CREDIT,
    );
    const moneyOperations = input.filter(
      op => op.paymentMethod === PaymentMethodType.MONEY,
    );

    const isValid = await validatePrinter();
    if (!isValid) {
      toastWarning('Impressora não conectada / Erro ao conectar');
      return;
    }
    try {
      setIsPrinting(true);
      await printReportHeader(userData?.name, userData?.email);
      await printAlign(ALIGN.LEFT);
      await printLine(`Total de compras: ${input.length}`);
      const total = handleGetTotal(input);
      await printLine(`Valor total: ${formatCurrency(total)}`);
      await printSpaces(2);

      await printAlign(ALIGN.CENTER);
      await printLine('Relatório por tipo de operação');
      await printSpaces();
      await printAlign(ALIGN.LEFT);
      await printLine('Pgto.     Compras          Total');
      await printDivisor();
      await printLine(generateReportLine(pixOperations, 'PIX'));
      await printLine(generateReportLine(cardOperations, 'CARTÃO'));
      await printLine(generateReportLine(moneyOperations, 'DINHEIRO'));
      await printSpaces(3);

      await printAlign(ALIGN.CENTER);
      await printLine('Relatório por produto');
      await printSpaces();
      await printAlign(ALIGN.LEFT);
      await printLine('Qtd. Desc.                Valor');
      await printDivisor();

      const allReportProducts: Array<ProductItemType> = [];

      input.map(purchase => {
        purchase.products.map(product => {
          const productIndex = allReportProducts.findIndex(
            prod => prod.name === product.name,
          );
          if (productIndex >= 0) {
            allReportProducts[productIndex].quantity += product.quantity;
          } else {
            allReportProducts.push({
              name: product.name,
              price: product.price,
              quantity: product.quantity,
              type: product.type,
            });
          }
        });
      });

      for (const prod of allReportProducts) {
        await printLine(generateProductLine(prod));
      }
      await printSpaces(4);
    } catch (err) {
      toastError(String(err));
    } finally {
      setIsPrinting(false);
    }
  };
  const printPurchase = async (input: PrintPurchaseType) => {
    console.debug('[ble-print-purchase]');
    const isValid = await validatePrinter();
    if (!isValid) {
      toastWarning('Impressora não conectada / Erro ao conectar');
      return;
    }
    try {
      setIsPrinting(true);
      await printHeader(input);
      await printLines(
        ...input.products.map(product => generateProductLine(product)),
      );
      await printDivisor(2);
      const total = input.products.reduce((prev, curr) => {
        return prev + curr.quantity * curr.price;
      }, 0);
      await printLine(
        `Total: ${formatCurrency(total)} - ${translatedPaymentMethod(
          input.paymentMethod,
        )}`,
      );
      if (input.paymentMethod === PaymentMethodType.MONEY && input.paidValue) {
        await printLine(
          `Dinheiro: ${formatCurrency(
            input.paidValue,
          )}\nTroco: ${formatCurrency(input.paidValue - total)}`,
        );
      }
      await printDivisor(2);
      await printLine(`Operador: ${input.user}`);
      await printLine(`ID da operação:\n${input.id}`);
      await printDivisor(2);
      await printAlign(ALIGN.CENTER);
      await printLine(
        'Leia o QR Code e acesse o perfil do externato no insta:',
      );
      await printQRCode(
        'https://www.instagram.com/externatosaofrancisco_oficial',
      );
      await printSpaces(2);
      setIsPrinting(false);
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
        printReport,
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
