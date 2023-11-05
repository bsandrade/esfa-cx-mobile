import {TextApp} from '@components/Base/Text';
import {TouchableIcon} from '@components/Base/TouchableIcon';
import {resPX} from '@src/utils';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  border: 1px solid ${({theme}) => theme.colors.primary.main};
  border-radius: ${({theme}) => theme.border.radius.normal};
  padding: ${resPX(10)} ${resPX(15)};
  align-items: center;
  margin-bottom: ${resPX(15)};
`;

export const ReportTypeIcon = styled(TouchableIcon.Awesome)`
  margin-right: ${resPX(10)};
`;

export const ReportTypeInfoArea = styled.View`
  justify-content: center;
  flex: 1;
`;

export const ReportTypeTitle = styled(TextApp)`
  font-family: ${({theme}) => theme.font.weight.bold};
`;

export const ReportTypeInfo = styled(TextApp)``;

export const ReportTypeSubInfoArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
