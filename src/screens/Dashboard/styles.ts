import {ButtonApp} from '@components/Base/Buttom';
import {ScreenView} from '@components/Base/ScreenView';
import {TextApp} from '@components/Base/Text';
import {resPX, resPct} from '@src/utils';
import styled from 'styled-components/native';

export const Container = styled(ScreenView)``;

export const Content = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const ReportArea = styled.View``;

export const ButtonsArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: ${resPX(10)} 0;
`;

export const DashButton = styled(ButtonApp)`
  min-width: ${resPct(60)};
`;

export const FilterArea = styled.View``;

export const FilterInfo = styled(TextApp)`
  margin-top: ${resPX(8)};
`;

export const FilterComponentsDateArea = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${resPX(10)};
`;

export const DateText = styled(TextApp)`
  font-size: ${({theme}) => resPX(theme.font.size.normal)};
`;

export const HourFilterArea = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const HourText = styled(TextApp)``;

export const HourInput = styled.TextInput`
  font-family: ${({theme}) => theme.font.weight.regular};
  font-size: ${({theme}) => resPX(theme.font.size.default)};
  padding: 0px;
  margin: 0px ${resPX(4)};
  min-width: ${resPct(50)};
  color: ${({theme}) => theme.colors.primary.main};
  border: 1px solid ${({theme}) => theme.colors.primary.main};
  border-radius: ${({theme}) => theme.border.radius.normal};
  text-align: center;
`;

export const FilterButton = styled(ButtonApp)`
  min-width: ${resPct(70)};
`;
