import {ButtonApp} from '@components/Base/Buttom';
import {TextApp} from '@components/Base/Text';
import {resPX, resPct} from '@src/utils';
import styled from 'styled-components/native';

export const Container = styled.Modal`
  flex: 1;
`;

export const PurchaseContext = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const PurchaseArea = styled.View`
  padding: ${resPct(6)} ${resPct(6)};
  width: 90%;
  margin: 0 5%;
  background-color: ${({theme}) => theme.colors.text.primary};
  min-height: 60%;
  border-radius: ${({theme}) => theme.border.radius.big};
`;

export const PurchaseId = styled(TextApp)`
  color: ${({theme}) => theme.colors.secundary.contrastText};
`;

export const PurchaseHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const PurchaseProducts = styled.FlatList`
  margin-top: ${resPX(8)};
`;

export const PurchaseProductArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const PurchaseProductDetails = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const PurchaseProductPriceDetails = styled.View`
  align-items: flex-end;
`;

export const PurchaseProductInfo = styled(TextApp)`
  color: ${({theme}) => theme.colors.secundary.contrastText};
`;

export const PurchasePrintButton = styled(ButtonApp)`
  margin-top: ${resPX(15)};
  background-color: ${({theme}) => theme.colors.secundary.contrastText};
`;
