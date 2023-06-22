/**
 *
 * Locations
 *
 */

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList } from 'react-native';
import { RootStackParamList } from '../../navigation/types';
import {
  StyledLocation,
  StyledLocationTitle,
  StyledLocations,
  StyledLocationWrapper,
} from './styles';
import { ILocationsProps } from './types';
import { ICoordinates } from '../../hooks/useWeather/types';
import IconButton from '../iconButton';

function Locations({
  locations,
  onLocationDelete,
}: ILocationsProps): JSX.Element {
  const { navigate } = useNavigation<
    NativeStackNavigationProp<RootStackParamList>
  >();

  const onAddressClick = (coords: ICoordinates) => {
    navigate('FavoriteLocationsMap', coords);
  };
  return (
    <>
      <StyledLocations>
        <FlatList
          data={locations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item: { title, coords } }) => (
            <StyledLocationWrapper>
              <StyledLocation onPress={() => onAddressClick(coords)}>
                <StyledLocationTitle>{title}</StyledLocationTitle>
              </StyledLocation>
              <IconButton
                iconName="trash"
                onPress={() => onLocationDelete({ title, coords })}
              />
            </StyledLocationWrapper>
          )}
        />
      </StyledLocations>
    </>
  );
}

export default Locations;
