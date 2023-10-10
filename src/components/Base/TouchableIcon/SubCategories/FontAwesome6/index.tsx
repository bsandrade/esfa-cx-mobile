import React from 'react';
import IconAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Container} from '../../styles';
import {TouchableIconProps} from '../..';

export const FontAwesome6 = ({
  onPress,
  ...input
}: TouchableIconProps): JSX.Element => {
  return (
    <Container onPress={onPress} activeOpacity={0.2}>
      <IconAwesome6 {...input} />
    </Container>
  );
};
