import CurrencyInput from 'react-native-currency-input';
import styled from 'styled-components/native';

export const Container = styled(CurrencyInput)`
  border: none;
  margin: 0;
  padding: 0;
  text-shadow: none;
  box-shadow: none;
  color: ${({theme}) => theme.colors.text.primary};
`;
