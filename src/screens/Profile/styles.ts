import {ButtonApp} from '@components/Base/Buttom';
import {ScreenView} from '@components/Base/ScreenView';
import {TextApp} from '@components/Base/Text';
import {resPX, resPct} from '@src/utils';
import {ImageBackground} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(ScreenView)`
  padding: 0;
`;

export const ProfileArea = styled.View`
  height: ${resPct(50)};
`;

export const ProfileAreaBackground = styled(ImageBackground)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ProfilePhotoArea = styled.View`
  width: 100%;
  height: 100%;
  max-width: ${resPX(100)};
  max-height: ${resPX(100)};
  border: 2px solid ${({theme}) => theme.colors.primary.main};
  border-color: ${({theme}) => theme.colors.primary.main};
  border-radius: ${resPX(50)};
  margin-bottom: ${resPX(10)};
`;

export const ProfilePhoto = styled.Image`
  flex: 1;
  border-radius: ${resPX(50)};
`;

export const ProfileName = styled(TextApp)``;
export const ProfileEmail = styled(TextApp)``;

export const ProfileOptions = styled.View`
  margin-top: ${resPX(15)};
  flex-direction: row;
  justify-content: space-between;
  padding: 0 ${resPct(6)};
`;

export const ProfileButton = styled(ButtonApp)`
  min-width: ${resPX(140)};
`;

export const PurchaseItemDivisor = styled.View`
  margin-top: ${resPX(4)};
`;

export const PurchaseArea = styled.View`
  flex: 1;
  padding: ${resPct(2)} ${resPct(6)};
  margin-top: ${resPX(10)};
`;

export const PurchaseList = styled.FlatList`
  margin: ${resPX(10)} 0;
`;
