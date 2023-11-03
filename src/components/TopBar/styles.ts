import {TextApp} from '@components/Base/Text';
import {resPX, resPct} from '@src/utils';
import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  padding: ${resPct(10)} 0px;
  padding-top: ${resPct(20)};
  margin-bottom: ${resPct(5)};
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled(TextApp)`
  font-size: ${({theme}) => resPX(theme.font.size.max)};
`;
