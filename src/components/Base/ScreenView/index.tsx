import React from 'react';
import {ViewProps} from 'react-native';
import {Container} from './styles';

export const ScreenView = ({children, ...props}: ViewProps): JSX.Element => {
  return <Container {...props}>{children}</Container>;
};
