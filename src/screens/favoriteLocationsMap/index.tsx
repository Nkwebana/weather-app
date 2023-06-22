/**
 *
 * FavoriteLocationsMap
 *
 */
import React from 'react';
import ApplicationWrapper from '../../components/applicationWrapper';
import Map from '../../components/map';
import { FavoriteLocationsMapProps } from '../../navigation/types';

function FavoriteLocationsMap({
  route: {
    params: { latitude, longitude },
  },
}: FavoriteLocationsMapProps): JSX.Element {
  return (
    <ApplicationWrapper hasBackButton title="Locations Map">
      <Map mapCenter={{ latitude, longitude }} />
    </ApplicationWrapper>
  );
}

export default FavoriteLocationsMap;
