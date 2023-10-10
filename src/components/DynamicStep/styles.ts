import {PersonAnimation} from '@components/Base/PersonAnimation';
import {TextApp} from '@components/Base/Text';
import {resPX} from '@src/utils';
import styled, {css} from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  height: ${resPX(17)};
`;

type StepInfoProps = {
  status: 'queue' | 'in_progress' | 'success' | 'error';
};

export const StepInfo = styled(TextApp)<StepInfoProps>`
  color: ${({theme}) => theme.colors.text.low};
  ${({status}) => {
    switch (status) {
      case 'in_progress':
        return css`
          color: ${({theme}) => theme.colors.text.primary};
        `;
      case 'error':
        return css`
          color: ${({theme}) => theme.colors.text.attention};
        `;
      case 'success':
        return css`
          color: ${({theme}) => theme.colors.text.success};
        `;
    }
  }}
  font-family: ${({theme}) => theme.font.weight.regular};
  font-size: ${({theme}) => resPX(theme.font.size.micro)};
`;
export const StepAnimation = styled(PersonAnimation)``;

export const StepProgress = styled.ActivityIndicator`
  margin-left: ${resPX(12)};
`;
