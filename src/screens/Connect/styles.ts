import {ButtonApp} from '@components/Base/Buttom';
import {ScreenView} from '@components/Base/ScreenView';
import {resPX} from '@src/utils';
import styled from 'styled-components/native';

export const Container = styled(ScreenView)`
  flex: 1;
`;

export const DeviceSearch = styled(ButtonApp)``;

export const ScanButton = styled(ButtonApp)`
  margin-bottom: ${resPX(20)};
`;

export const ScanningIndicator = styled.ActivityIndicator`
  margin-left: ${resPX(8)};
`;

export const DeviceList = styled.FlatList``;

export const DeviceSeparator = styled.View`
  margin-top: ${resPX(10)};
`;
