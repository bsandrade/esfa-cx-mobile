import {TextApp} from '@components/Base/Text';
import {resPX} from '@src/utils';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  padding: ${resPX(9)} ${resPX(16)};
  background-color: ${({theme}) => theme.colors.text.primary};
  border-radius: ${({theme}) => theme.border.radius.big};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ProductName = styled(TextApp)`
  font-family: ${({theme}) => theme.font.weight.regular};
  color: ${({theme}) => theme.colors.background};
`;

export const ProductPrice = styled(TextApp)`
  font-family: ${({theme}) => theme.font.weight.regular};
  color: ${({theme}) => theme.colors.background};
  margin-right: ${resPX(12)};
`;

export const ProductInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ProductQuantity = styled.TextInput`
  font-family: ${({theme}) => theme.font.weight.regular};
  font-size: ${({theme}) => resPX(theme.font.size.default)};
  padding: 0px;
  margin: 0px ${resPX(4)};
  color: ${({theme}) => theme.colors.background};
  text-align: center;
`;
