/**
 *
 * FavoriteLocations
 *
 */
import React, { useEffect } from 'react';
import ApplicationWrapper from '../../components/applicationWrapper';
import Locations from '../../components/locations';
import { useAppContext } from '../../context';
import { useNavigation } from '@react-navigation/native';

function FavoriteLocations(): JSX.Element {
  const {
    user: {
      profile: { favoriteLocations },
      removeFavoriteLocation,
    },
  } = useAppContext();

  const { goBack } = useNavigation();

  useEffect(() => {
    if (favoriteLocations.length === 0) {
      goBack();
    }
  }, [favoriteLocations, goBack]);

  return (
    <ApplicationWrapper hasBackButton title="Favorite Locations">
      <Locations
        locations={favoriteLocations}
        onLocationDelete={removeFavoriteLocation}
      />
    </ApplicationWrapper>
  );
}

export default FavoriteLocations;
