import {ButtonApp} from '@components/Base/Buttom';
import {ScreenView} from '@components/Base/ScreenView';
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

export const HomeCheckoutButton = styled(ButtonApp)`
  margin-top: ${resPX(14)};
  margin-bottom: ${resPX(6)};
`;
