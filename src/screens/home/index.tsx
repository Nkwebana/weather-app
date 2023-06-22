/**
 *
 * Home
 *
 */
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AutoComplete from '../../components/autoComplete';
import {
  StyledActionsWrapper,
  StyledApplicationWrapper,
  StyledAutoCompeteWrapper,
} from '../../components/common';
import CurrentDayWeatherView from '../../components/currentDayWeatherView';
import WeatherForecastView from '../../components/weatherForecastView';
import useLocation from '../../hooks/useLocation';
import useWeather from '../../hooks/useWeather';
import { ICoordinates } from '../../hooks/useWeather/types';
import { RootStackParamList } from '../../navigation/types';
import { debounce, getIconName } from '../../utils';
import IconButton from '../../components/iconButton';
import { useAppContext } from '../../context';
import { TemperatureUnit } from '../../hooks/useWeather/enums';

function Home(): JSX.Element {
  const {
    getTodaysWeather,
    updateTemperatureUnit,
    todaysWeather,
    weatherForecast,
    getWeatherForecast,
    activeMetric,
  } = useWeather();
  const {
    getAddressSuggestions,
    addressSuggestions,
    deviceLocation,
    updateAddress,
    addAddressToFavorites,
    address,
  } = useLocation();
  const {
    user: { profile },
  } = useAppContext();

  const { navigate } = useNavigation<
    NativeStackNavigationProp<RootStackParamList>
  >();

  const handleFavorites = () => navigate('FavoriteLocations');

  const handleLocationSearch = debounce((searchTerm: string) => {
    if (searchTerm.length > 0) {
      getAddressSuggestions(searchTerm);
    }
  }, 500);

  const handleLocationSelect = (location: ICoordinates, title: string) => {
    updateAddress({ coords: location, title });
    getTodaysWeather({
      latitude: location.latitude,
      longitude: location.longitude,
      unit: activeMetric,
    });
  };

  const handleAddLocationToFavorites = () => {
    addAddressToFavorites();
  };

  const handleTemperatureType = () => {
    if (activeMetric === TemperatureUnit.Metric) {
      return updateTemperatureUnit(TemperatureUnit.Imperial);
    }

    updateTemperatureUnit(TemperatureUnit.Metric);
  };

  useEffect(() => {
    if (deviceLocation) {
      getTodaysWeather({
        latitude: deviceLocation.latitude,
        longitude: deviceLocation.longitude,
        unit: activeMetric,
      });
    }
  }, [deviceLocation, getTodaysWeather, activeMetric]);

  useEffect(() => {
    if (todaysWeather && deviceLocation) {
      getWeatherForecast(deviceLocation);
    }
  }, [todaysWeather, deviceLocation, getWeatherForecast]);

  return (
    <StyledApplicationWrapper>
      {todaysWeather && <CurrentDayWeatherView todaysWeather={todaysWeather} />}
      {weatherForecast && todaysWeather && (
        <WeatherForecastView
          weatherForecast={weatherForecast}
          weatherCondition={todaysWeather.type}
          onAddToFavorites={handleAddLocationToFavorites}
        />
      )}
      <StyledActionsWrapper>
        <StyledAutoCompeteWrapper>
          <AutoComplete
            onSelect={handleLocationSelect}
            options={addressSuggestions}
            onChangeText={handleLocationSearch}
            placeholder={address?.title || 'Enter a city or zip code'}
          />
        </StyledAutoCompeteWrapper>
        <IconButton
          onPress={handleFavorites}
          iconName="starIcon"
          counter={profile.favoriteLocations.length}
          disabled={profile.favoriteLocations.length === 0}
        />
        <IconButton
          onPress={handleTemperatureType}
          iconName={getIconName(activeMetric)}
        />
      </StyledActionsWrapper>
    </StyledApplicationWrapper>
  );
}

export default Home;
