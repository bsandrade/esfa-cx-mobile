import {Peripheral as PER} from 'react-native-ble-manager';

declare module 'react-native-ble-manager' {
  interface Peripheral extends PER {
    connected?: boolean;
    connecting?: boolean;
  }
}
