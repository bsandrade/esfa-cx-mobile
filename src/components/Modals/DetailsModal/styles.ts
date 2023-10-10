import {ButtonApp} from '@components/Base/Buttom';
import {TextApp} from '@components/Base/Text';
import {resPX, resPct} from '@src/utils';
import styled from 'styled-components/native';

export const Container = styled.Modal`
  flex: 1;
  align-items: end;
`;

export const DetailsContext = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
`;

export const DetailsArea = styled.View`
  padding: ${resPct(2)} ${resPct(6)};
  width: 100%;
  background-color: ${({theme}) => theme.colors.primary.main};
  min-height: 40%;
  border-top-left-radius: ${({theme}) => theme.border.radius.big};
  border-top-right-radius: ${({theme}) => theme.border.radius.big};
`;

export const DetailsHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${resPX(10)};
`;

export const DetailsText = styled(TextApp)`
  color: ${({theme}) => theme.colors.background};
`;

export const ProductArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: auto;
`;

export const ProductInfo = styled(TextApp)`
  color: ${({theme}) => theme.colors.text.low};
  font-family: ${({theme}) => theme.font.weight.regular};
  font-size: ${({theme}) => resPX(theme.font.size.mini)};
`;

export const FinishArea = styled.View``;

export const FinishInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${resPX(8)};
`;

export const FinishText = styled(TextApp)`
  color: ${({theme}) => theme.colors.background};
`;

export const FinishButton = styled(ButtonApp)`
  background-color: ${({theme}) => theme.colors.secundary.main};
  margin-bottom: ${resPX(6)};
`;

export const DetailsList = styled.FlatList`
  height: fit-content;
`;
