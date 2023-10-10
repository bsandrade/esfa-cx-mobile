import React from 'react';
import {TextProps} from 'react-native';
import {Container} from './styles';

export const TextApp = ({children, ...props}: TextProps): JSX.Element => {
  return <Container {...props}>{children}</Container>;
};
