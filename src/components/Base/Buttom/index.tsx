import React from 'react';
import {ButtomText, Container} from './styles';
import {TouchableOpacityProps} from 'react-native';
import {useTheme} from 'styled-components/native';

type ButtomAppProps = TouchableOpacityProps & {
  name: string;
  textColor?: string;
  onPress: () => void;
  Animation?: JSX.Element;
};

export const ButtonApp = ({
  name,
  onPress,
  Animation,
  textColor,
  ...props
}: ButtomAppProps): JSX.Element => {
  const theme = useTheme();
  const color = textColor ?? theme.colors.background;
  return (
    <Container activeOpacity={0.7} {...props} onPress={onPress}>
      <ButtomText
        style={{
          color,
        }}>
        {name.toUpperCase()}
      </ButtomText>
      {Animation && Animation}
    </Container>
  );
};
