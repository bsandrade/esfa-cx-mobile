import {resPX, resPct} from '@src/utils';
import styled from 'styled-components/native';
import {TextApp} from '../Text';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${resPct(5)} ${resPct(5)};
  background-color: ${({theme}) => theme.colors.text.primary};
  border-radius: ${({theme}) => theme.border.radius.big};
`;

export const ButtomText = styled(TextApp)`
  text-align: center;
  font-size: ${({theme}) => resPX(theme.font.size.small)};
`;
