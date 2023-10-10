import React from 'react';
import {Container} from './styles';
import {IconButtonProps} from 'react-native-vector-icons/Icon';
import {Icon} from 'react-native-elements';
import {FontAwesome6} from './SubCategories/FontAwesome6';

export type TouchableIconProps = IconButtonProps & {
  onPress?: () => void;
};

const TouchableIconComponent = ({
  onPress,
  ...input
}: TouchableIconProps): JSX.Element => {
  return (
    <Container onPress={onPress} activeOpacity={0.7}>
      <Icon {...input} />
    </Container>
  );
};

export const TouchableIcon = {
  Default: TouchableIconComponent,
  Awesome: FontAwesome6,
};
