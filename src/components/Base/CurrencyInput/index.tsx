import React from 'react';
import {CurrencyInputProps} from 'react-native-currency-input';
import {Container} from './styles';

export const CurrencyInput = (input: CurrencyInputProps): JSX.Element => {
  return <Container {...input} />;
};
