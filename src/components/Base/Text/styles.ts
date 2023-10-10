import {resPX} from '@src/utils';
import styled from 'styled-components/native';

export const Container = styled.Text`
  font-family: 'Roboto-Medium';
  color: ${({theme}) => theme.colors.text.primary};
  font-size: ${({theme}) => resPX(theme.font.size.default)};
`;
