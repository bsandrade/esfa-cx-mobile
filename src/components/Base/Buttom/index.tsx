import React from 'react';
import {ButtomText, Container} from './styles';
import {TouchableOpacityProps} from 'react-native';

type ButtomAppProps = TouchableOpacityProps & {
  name: string;
  onPress: () => void;
  Animation?: JSX.Element;
};

export const ButtonApp = ({
  name,
  onPress,
  Animation,
  ...props
}: ButtomAppProps): JSX.Element => {
  return (
    <Container activeOpacity={0.7} {...props} onPress={onPress}>
      <ButtomText>{name.toUpperCase()}</ButtomText>
      {Animation && Animation}
    </Container>
  );
};
