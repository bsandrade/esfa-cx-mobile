export enum BluetoothEventTypes {
  FOUND_NEW_DEVICE = 'BleManagerDiscoverPeripheral',
  STOP_SCAN = 'BleManagerStopScan',
  DISCONNECT_DEVICE = 'BleManagerDisconnectPeripheral',
  UPDATE_DEVICE_PROPERTY = 'BleManagerDidUpdateValueForCharacteristic',
}
