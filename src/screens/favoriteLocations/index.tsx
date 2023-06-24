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

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import useWeather from '../../hooks/useWeather';
import { IAddress } from '../../hooks/useLocation/types';

function FavoriteLocations(): JSX.Element {
  const {
    user: { profile, removeFavoriteLocation },
    api: { activeMetric: unit, updateAddress },
  } = useAppContext();

  const { getTodaysWeather } = useWeather();

  const { goBack } = useNavigation<
    NativeStackNavigationProp<RootStackParamList>
  >();

  const handleLocationSelect = ({
    coords: { latitude, longitude },
    title,
  }: IAddress) => {
    updateAddress({ coords: { latitude, longitude }, title });
    getTodaysWeather({ latitude, longitude, unit });
    goBack();
  };

  useEffect(() => {
    if (profile.favoriteLocations.length === 0) {
      goBack();
    }
  }, [profile, goBack]);

  return (
    <ApplicationWrapper hasBackButton title="Favorite Locations">
      <Locations
        locations={profile.favoriteLocations}
        onLocationDelete={removeFavoriteLocation}
        onLocationSelect={handleLocationSelect}
      />
    </ApplicationWrapper>
  );
}

export default FavoriteLocations;
