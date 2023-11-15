import {ButtonApp} from '@components/Base/Buttom';
import {ScreenView} from '@components/Base/ScreenView';
import {TextApp} from '@components/Base/Text';
import {resPX} from '@src/utils';
import styled from 'styled-components/native';

export const Container = styled(ScreenView)``;

export const ProductList = styled.FlatList`
  height: fit-content;
  background-color: '${({theme}) => theme.colors.background}';
`;

export const ProductSeparator = styled.View`
  margin-top: ${resPX(10)};
`;

export const ProductInfoIndicator = styled.ActivityIndicator`
  margin-top: ${resPX(40)};
`;

export const ProductInfoArea = styled.View`
  padding: ${resPX(10)};
  margin-top: ${resPX(40)};
  align-items: center;
  justify-content: center;
  border: 1px solid ${({theme}) => theme.colors.primary.main};
  border-radius: ${({theme}) => theme.border.radius.normal};
`;

export const ProductInfoText = styled(TextApp)``;

export const HomeCheckoutButton = styled(ButtonApp)`
  margin-top: ${resPX(14)};
  margin-bottom: ${resPX(6)};
`;
