/**
 *
 * IconButton
 *
 */

import React from 'react';
import * as icons from '../../assets';
import { StyledText } from '../common';
import {
  StyledCounterWrapper,
  StyledIconButton,
  StyledFavoritesIcon,
} from './styles';
import { IconButtonProps } from './types';

function IconButton({
  onPress,
  iconName,
  disabled,
  counter = 0,
}: IconButtonProps): JSX.Element {
  return (
    <StyledIconButton onPress={onPress} disabled={disabled}>
      {counter > 0 && (
        <StyledCounterWrapper>
          <StyledText fontSize={15}>{counter}</StyledText>
        </StyledCounterWrapper>
      )}
      <StyledFavoritesIcon
        source={icons[iconName as keyof typeof icons]}
        resizeMode="stretch"
      />
    </StyledIconButton>
  );
}

export default IconButton;
