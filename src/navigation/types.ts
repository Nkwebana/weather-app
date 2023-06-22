import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ICoordinates } from '../hooks/useWeather/types';

type RootStackParamList = {
  Home: undefined;
  FavoriteLocations: undefined;
  FavoriteLocationsMap: ICoordinates;
  coords: ICoordinates;
};

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type FavoriteLocationsProps = NativeStackScreenProps<
  RootStackParamList,
  'FavoriteLocations'
>;
type FavoriteLocationsMapProps = NativeStackScreenProps<
  RootStackParamList,
  'FavoriteLocationsMap'
>;

export type {
  FavoriteLocationsMapProps,
  FavoriteLocationsProps,
  HomeProps,
  RootStackParamList,
};
