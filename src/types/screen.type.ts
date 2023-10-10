import {NavigationProp} from '@react-navigation/native';

export type ScreenProps = {
  navigation?: NavigationProp<any>;
  route?: {
    params: any;
  };
};
