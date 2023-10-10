import {PermissionsAndroid, Platform} from 'react-native';

export const handleAndroidPermissions = () => {
  if (Platform.OS === 'android' && Platform.Version >= 31) {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    ]).then(result => {
      if (result) {
        console.debug(
          '[bluetooth-permission] User accepts runtime permissions android 12+',
        );
      } else {
        console.error(
          '[bluetooth-permission] User refuses runtime permissions android 12+',
        );
      }
    });
  } else if (Platform.OS === 'android' && Platform.Version >= 23) {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then(checkResult => {
      if (checkResult) {
        console.debug(
          '[bluetooth-permission] runtime permission Android <12 already OK',
        );
      } else {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ).then(requestResult => {
          if (requestResult) {
            console.debug(
              '[bluetooth-permission] User accepts runtime permission android <12',
            );
          } else {
            console.error(
              '[bluetooth-permission] User refuses runtime permission android <12',
            );
          }
        });
      }
    });
  }
};
