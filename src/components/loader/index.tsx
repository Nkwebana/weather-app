/**
 *
 * Loader
 *
 */

import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useAppContext } from '../../context';
import { StyledLoader } from './styles';
import { ILoaderProps } from './types';

function Loader(_props: ILoaderProps): JSX.Element | null {
  const {
    ui: { isLoading },
  } = useAppContext();

  return isLoading ? (
    <StyledLoader>
      <ActivityIndicator size="large" />
    </StyledLoader>
  ) : null;
}

export default Loader;
