import styled from 'styled-components/native';
import {TextApp} from '@components/Base/Text';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAwesome6 from 'react-native-vector-icons/FontAwesome6';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {Icon} from 'react-native-elements';
import {resPX} from '@src/utils';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  height: ${resPX(60)};
`;

export const ProductHeaderArea = styled.View`
  height: ${resPX(60)};
  flex-direction: row;
  margin-right: auto;
`;

export const ProductIconArea = styled.View`
  height: ${resPX(60)};
  width: ${resPX(60)};
  align-items: center;
  justify-content: center;
  border: 1px solid ${({theme}) => theme.colors.primary.main};
  border-radius: ${({theme}) => theme.border.radius.normal};
`;

export const ProductIconEntypo = styled(IconEntypo)``;
export const ProductIconAwesome6 = styled(IconAwesome6)``;
export const ProductIconCommunity = styled(IconCommunity)``;

export const ProductInfoArea = styled.View`
  padding: 0 ${resPX(15)};
  height: ${resPX(60)};
  justify-content: space-between;
`;

export const ProductInfoName = styled(TextApp)`
  font-family: ${({theme}) => theme.font.weight.bold};
  flex: 1;
  width: ${resPX(180)};
`;

export const ProductInfoValue = styled(TextApp)``;

export const ProductQuantityArea = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ProductQuantityIconButton = styled.TouchableOpacity`
  height: ${resPX(30)};
  width: ${resPX(30)};
  border: 1px solid ${({theme}) => theme.colors.primary.main};
  border-radius: ${resPX(50)};
  align-items: center;
  justify-content: center;
`;

export const ProductQuantityIcon = styled(Icon)``;

export const ProductQuantityInfo = styled(TextApp)`
  margin: 0 ${resPX(5)};
  font-size: ${({theme}) => resPX(theme.font.size.bigger)};
`;
