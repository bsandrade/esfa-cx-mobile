import {TextApp} from '@components/Base/Text';
import {hexToRgba, resPX, resPct} from '@src/utils';
import styled from 'styled-components/native';
import {css} from 'styled-components/native';

export const Container = styled.Modal`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ModalArea = styled.View`
  flex: 1;
  background-color: ${({theme}) => hexToRgba(theme.colors.text.primary, 0.4)};
`;

export const ModalInfoArea = styled.View`
  align-items: center;
`;

export const ModalTitle = styled(TextApp)``;

export const StepArea = styled.View`
  margin: auto auto;
  padding: ${resPX(18)};
  width: ${resPct(100)};
  height: ${resPct(40)};
  border-radius: ${({theme}) => theme.border.radius.normal};
  background-color: ${({theme}) => theme.colors.background};
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

export const StepSection = styled.View`
  flex: 1;
  justify-content: center;
`;
