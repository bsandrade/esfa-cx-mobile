import styled from 'styled-components/native';

export const Container = styled.Modal`
  flex: 1;
`;

export const IsLoadingArea = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.backgroundTransparent};
`;

export const ContainerIndicator = styled.ActivityIndicator``;
