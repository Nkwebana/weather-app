/**
 *
 * Map
 *
 */

import React from 'react';

import { useAppContext } from '../../context';
import useLocation from '../../hooks/useLocation';
import { StyledMap, StyledMarker } from './styles';
import { IMapProps } from './types';

function Map({
  mapCenter: { latitude, longitude },
}: IMapProps): JSX.Element | null {
  const { deviceLocation } = useLocation();
  const {
    user: {
      profile: { favoriteLocations },
    },
  } = useAppContext();

  return deviceLocation ? (
    <StyledMap
      initialRegion={{
        longitude: longitude,
        latitude: latitude as number,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {favoriteLocations.map((location) => (
        <StyledMarker
          key={location.title}
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title={location.title}
          isPreselected={true}
        />
      ))}
    </StyledMap>
  ) : null;
}

export default Map;
