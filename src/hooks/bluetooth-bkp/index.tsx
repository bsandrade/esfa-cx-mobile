import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';
import BleManager, {
  BleScanCallbackType,
  BleScanMatchMode,
  BleScanMode,
  Peripheral,
  PeripheralInfo,
} from 'react-native-ble-manager';
import {BluetoothEventTypes} from './event-types';
import {handleAndroidPermissions} from './request-permission';
import {Buffer} from 'buffer';

type BluetoothContextType = {
  devices: Map<string, Peripheral>;
  scanning: boolean;
  scanDevices: () => void;
  connectDevice: (id: string) => Promise<void>;
  connectedDevice: PeripheralInfo | null;
  disconnect: () => void;
  printString: (input: string) => Promise<void>;
  printBuffer: (input: Buffer) => Promise<void>;
};

type BluetoothProviderType = {
  children: ReactNode;
};

const bluetoothManagerModule = NativeModules.BleManager;
const bluetoothManagerEmitter = new NativeEventEmitter(bluetoothManagerModule);

const SECONDS_TO_SCAN_FOR = 5;
const SERVICE_UUIDS: string[] = [];
const ALLOW_DUPLICATES = true;

const BluetoothContext = createContext({} as BluetoothContextType);

const BluetoothProvider = ({children}: BluetoothProviderType): JSX.Element => {
  const [scanning, setScaning] = useState(false);
  const [peripherals, setPeripherals] = useState(
    new Map<Peripheral['id'], Peripheral>(),
  );

  const handleRetrieveConnecteds = async () => {
    const connectDevices = await BleManager.getConnectedPeripherals();
    if (connectDevices.length === 0) {
      console.warn('[retrieveConnected] No connected peripherals found.');
      return;
    }

    console.debug('[retrieveConnected] connectedPeripherals', connectDevices);

    setConnectedDevice(connectDevices[0]);

    for (var i = 0; i < connectDevices.length; i++) {
      var peripheral = connectDevices[i];
      addOrUpdatePeripheral(peripheral.id, {...peripheral, connected: true});
    }
  };

  const addOrUpdatePeripheral = (id: string, updatedPeripheral: Peripheral) => {
    setPeripherals(map => new Map(map.set(id, updatedPeripheral)));
  };

  const [connectedDevice, setConnectedDevice] = useState<PeripheralInfo | null>(
    null,
  );

  const disconnect = async () => {
    if (connectedDevice && connectedDevice.connected) {
      await BleManager.disconnect(connectedDevice.id);
    } else {
      throw new Error('Device not connected');
    }
  };

  const connectDevice = async (id: string) => {
    console.debug('[bluetooth-connect] starting...');
    await BleManager.connect(id);
    const peripheralData = await BleManager.retrieveServices(id);

    // const rssi = await BleManager.readRSSI(peripheralData.id);
    // let p = peripherals.get(peripheralData.id);
    // if (p) {
    //   addOrUpdatePeripheral(peripheralData.id, {...peripheralData, rssi});
    // }

    await handleRetrieveConnecteds();
    setConnectedDevice(peripheralData);
    console.debug('[bluetooth-connect] sucsess');
  };

  const handleStopScan = () => {
    setScaning(false);
    console.debug('[handleStopScan] scan is stopped.');
  };

  const handleAddNewDevice = (peripheral: Peripheral) => {
    console.debug('[bluetooth-module] found new device:', peripheral);
    if (!peripheral.name) {
      peripheral.name = 'SEM NOME';
    }
    addOrUpdatePeripheral(peripheral.id, peripheral);
  };

  useEffect(() => {
    BleManager.start({showAlert: false})
      .then(() => console.debug('BleManager started.'))
      .catch(error => console.error('BeManager could not be started.', error));

    const listeners = [
      bluetoothManagerEmitter.addListener(
        BluetoothEventTypes.FOUND_NEW_DEVICE,
        handleAddNewDevice,
      ),
      bluetoothManagerEmitter.addListener(
        BluetoothEventTypes.STOP_SCAN,
        handleStopScan,
      ),
      bluetoothManagerEmitter.addListener(
        BluetoothEventTypes.DISCONNECT_DEVICE,
        () => setConnectedDevice(null),
      ),
      bluetoothManagerEmitter.addListener(
        BluetoothEventTypes.UPDATE_DEVICE_PROPERTY,
        () => {
          console.debug('[UPDATE NOW]');
        },
      ),
    ];
    console.debug('[bluetooth-context] starting...');
    handleAndroidPermissions();

    return () => {
      console.debug('[bluetooth-context] stoping... removing listeners');
      for (const listener of listeners) {
        listener.remove();
      }
    };
  });

  const scanDevices = () => {
    if (!scanning) {
      setPeripherals(new Map<Peripheral['id'], Peripheral>());
      try {
        console.debug('[bluetooth-context] scanning...');
        setScaning(true);

        BleManager.scan(SERVICE_UUIDS, SECONDS_TO_SCAN_FOR, ALLOW_DUPLICATES, {
          matchMode: BleScanMatchMode.Sticky,
          scanMode: BleScanMode.LowLatency,
          callbackType: BleScanCallbackType.AllMatches,
        })
          .then(() => {
            console.debug('[bluetooth-context] scan successfully.');
          })
          .catch(err => {
            console.error('[bluetooth-context] scan error', err);
          });
      } catch (error) {
        console.error('[bluetooth-context] scan error thrown', error);
      }
    }
  };

  const printString = async (input: string) => {
    if (connectedDevice) {
      const canWrite = connectedDevice.characteristics
        ?.map(c => {
          return {
            characs: c.properties,
            service: c.service,
            characId: c.characteristic,
          };
        })
        .filter(c => c.characs.Write === 'Write');

      if (!canWrite) {
        throw new Error('Device cant write');
      }

      const buff = Buffer.from(input);
      await BleManager.writeWithoutResponse(
        connectedDevice.id,
        canWrite[0].service,
        canWrite[0].characId,
        buff.toJSON().data,
      );
      console.log('[bluetooth-print] success');
    } else {
      throw new Error('no device connected');
    }
  };

  const printBuffer = async (input: Buffer) => {
    if (connectedDevice) {
      const canWrite = connectedDevice.characteristics
        ?.map(c => {
          return {
            characs: c.properties,
            service: c.service,
            characId: c.characteristic,
          };
        })
        .filter(c => c.characs.Write === 'Write');

      if (!canWrite) {
        throw new Error("Device can't write");
      }

      console.log(canWrite[1]);
      await BleManager.write(
        connectedDevice.id,
        canWrite[1].service,
        canWrite[1].characId,
        input.toJSON().data,
      );
      // connectedDevice.characteristics?.map(c => {
      //   console.log(
      //     `${c.characteristic} - ${c.descriptors} - ${c.properties} - ${c.service}`,
      //   );
      //   if (c.descriptors) {
      //     c.descriptors?.map(desc => {
      //       console.log(`desc ${desc.uuid} - ${desc.value}`);
      //     });
      //   }

      //   if (c.properties) {
      //     console.log(JSON.stringify(c.properties));
      //   }
      // });
      console.log(canWrite.length);
      console.log('[bluetooth-print-buffer] success');
    } else {
      throw new Error('no device connected');
    }
  };

  return (
    <BluetoothContext.Provider
      value={{
        connectDevice,
        connectedDevice,
        devices: peripherals,
        disconnect,
        printString,
        scanDevices,
        scanning,
        printBuffer,
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
