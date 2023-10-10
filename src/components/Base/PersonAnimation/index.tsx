import React from 'react';
import {LottieViewProps} from 'lottie-react-native';
import {AnimationView, Container} from './styles';
import {AnimationType} from '@src/types';
const Animations = {
  CHECK: require('@animations/animation_check.json'),
  CHECK_MINI: require('@animations/animation_check_mini.json'),
  ERROR: require('@animations/animation_error.json'),
};

type AnimationProps = Omit<LottieViewProps, 'source'> & {
  animation: AnimationType;
  size: number;
  styling?: Record<string, string | number>;
};

export const PersonAnimation = ({
  animation,
  size,
  styling,
  ...input
}: AnimationProps): JSX.Element => {
  return (
    <Container>
      <AnimationView
        {...input}
        source={Animations[animation]}
        style={{
          ...styling,
          width: size * 100,
          height: size * 100,
        }}
      />
    </Container>
  );
};
