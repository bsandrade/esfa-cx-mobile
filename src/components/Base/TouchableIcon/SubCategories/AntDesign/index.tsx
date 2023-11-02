import React from 'react';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {Container} from '../../styles';
import {TouchableIconProps} from '../..';

export const AntDesign = ({
  onPress,
  ...input
}: TouchableIconProps): JSX.Element => {
  return (
    <Container onPress={onPress} activeOpacity={0.2}>
      <IconAntDesign {...input} />
    </Container>
  );
};
