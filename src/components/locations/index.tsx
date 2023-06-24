/**
 *
 * Locations
 *
 */

import React from 'react';
import { ScrollView } from 'react-native';
import {
  StyledLocation,
  StyledLocationTitle,
  StyledLocations,
  StyledLocationWrapper,
} from './styles';
import { ILocationsProps } from './types';
import IconButton from '../iconButton';

function Locations({
  locations,
  onLocationDelete,
  onLocationSelect,
}: ILocationsProps): JSX.Element {
  return (
    <StyledLocations>
      <ScrollView>
        {locations.map(({ coords, title }, index) => (
          <StyledLocationWrapper key={title}>
            <StyledLocation onPress={() => onLocationSelect({ coords, title })}>
              <StyledLocationTitle>{title}</StyledLocationTitle>
            </StyledLocation>
            <IconButton
              iconName="trash"
              onPress={() => onLocationDelete(index)}
            />
          </StyledLocationWrapper>
        ))}
      </ScrollView>
    </StyledLocations>
  );
}

export default Locations;
