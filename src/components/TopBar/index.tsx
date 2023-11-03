import React from 'react';
import {Container, Title} from './styles';
import {useTheme} from 'styled-components';
import {TouchableIcon} from '@components/Base/TouchableIcon';
import {DefaultTheme} from 'styled-components/native';

type TopBarProps = {
  leftIconName?: string;
  onClickLeftIcon?: () => void;
  rightIconName?: string;
  onClickRightIcon?: () => void;
  name: string;
};

export const TopBar = ({
  leftIconName,
  onClickLeftIcon,
  name,
  rightIconName,
  onClickRightIcon,
}: TopBarProps): JSX.Element => {
  const theme = useTheme() as DefaultTheme;
  const iconColor = theme.colors.text.primary;
  const iconSize = theme.icon.size.normal;

  return (
    <Container>
      {leftIconName && (
        <TouchableIcon.Default
          size={iconSize}
          color={iconColor}
          name={leftIconName}
          onPress={onClickLeftIcon}
        />
      )}
      <Title>{name}</Title>
      {rightIconName && (
        <TouchableIcon.Default
          size={iconSize}
          color={iconColor}
          name={rightIconName}
          onPress={onClickRightIcon}
        />
      )}
    </Container>
  );
};
