import React from 'react';
import {Container, StepAnimation, StepInfo, StepProgress} from './styles';
import {AnimationType} from '@src/types';

type DynamicStepProps = {
  text: string;
  status: 'queue' | 'in_progress' | 'success' | 'error';
};

export const DynamicStep = ({status, text}: DynamicStepProps): JSX.Element => {
  const renderAnimation = (input: AnimationType, size = 0.3): JSX.Element => {
    const styling = {
      marginLeft: 0,
    };
    if (input === AnimationType.ERROR) {
      styling.marginLeft = 7;
    }

    return (
      <StepAnimation
        size={size}
        animation={input}
        autoPlay
        loop={false}
        styling={styling}
      />
    );
  };
  return (
    <Container>
      <StepInfo status={status}>{text}</StepInfo>
      {status === 'in_progress' && <StepProgress size={14} />}
      {status === 'success' && renderAnimation(AnimationType.CHECK_MINI, 0.45)}
      {status === 'error' && renderAnimation(AnimationType.ERROR)}
    </Container>
  );
};
