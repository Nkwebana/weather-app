import { useCallback, useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { useMutation } from 'react-query';
import { IAutoCompleteSelectOption } from '../../components/autoComplete/types';
import { ModalType } from '../../components/modal/enums';
import { useAppContext } from '../../context';
import useLocationPermission from '../useLocationPermission';
import { IApiResponse, ICoordinates } from '../useWeather/types';
import { geoCode, reverseGeoCode } from './api';
import { IAddress, IGeoCodeResponse, IReverseGeocodeResponse } from './types';
import { formatLocationSearchResults } from './utils';

const useLocation = () => {
  const hasUserGrantedLocationPermission = useLocationPermission();
  const {
    ui: { showModal, hideModal },
    user: { addFavoriteLocation },
  } = useAppContext();

  const [deviceLocation, setDeviceLocation] = useState<ICoordinates>();
  const [address, setAddress] = useState<IAddress>();

  const [addressSuggestions, setAddressSuggestions] = useState<
    IAutoCompleteSelectOption[]
  >([]);

  const { mutate: getAddressDescription } = useMutation(
    'getAddressDescription',
    (coords: ICoordinates) => reverseGeoCode(coords),
    {
      onSuccess: ({ result, error, ok }: IApiResponse) => {
        if (error) {
          return showModal({
            message: new Error(error as string).message,
            primaryAction: () => false,
            primaryActionTitle: 'Okay',
            secondaryAction: hideModal,
            secondaryActionTitle: 'Cancel',
            type: ModalType.Error,
            title: 'Location Error',
          });
        }

        if (ok && result) {
          const {
            address: { LongLabel },
            location: { x, y },
          } = result as IReverseGeocodeResponse;
          setAddress({
            title: LongLabel,
            coords: {
              latitude: y,
              longitude: x,
            },
          });
        }
      },
    },
  );

  const getDeviceLocation = useCallback(
    () =>
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          setDeviceLocation(coords);
          getAddressDescription(coords);
        },
        (error) =>
          showModal({
            message: new Error(error.message).message,
            primaryAction: () => false,
            primaryActionTitle: 'Okay',
            secondaryAction: hideModal,
            secondaryActionTitle: 'Cancel',
            type: ModalType.Error,
            title: 'Location Error',
          }),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      ),
    [showModal, hideModal, getAddressDescription],
  );

  const { mutate: getAddressSuggestions } = useMutation(
    'getAddressSuggestions',
    (searchTerm: string) => geoCode(searchTerm, deviceLocation as ICoordinates),
    {
      onSuccess: ({ result, error, ok }: IApiResponse) => {
        if (error) {
          return showModal({
            message: new Error(error as string).message,
            primaryAction: () => false,
            primaryActionTitle: 'Okay',
            secondaryAction: hideModal,
            secondaryActionTitle: 'Cancel',
            type: ModalType.Error,
            title: 'Location Error',
          });
        }

        if (ok && result) {
          const response = result as IGeoCodeResponse;

          const formattedSuggestions = formatLocationSearchResults(
            response.candidates,
          );

          setAddressSuggestions(formattedSuggestions);
        }
      },
    },
  );

  const addAddressToFavorites = () => {
    if (address) {
      addFavoriteLocation(address);
    }
  };

  useEffect(() => {
    if (hasUserGrantedLocationPermission && !deviceLocation) {
      getDeviceLocation();
    }
  }, [getDeviceLocation, hasUserGrantedLocationPermission, deviceLocation]);

  return {
    getAddressSuggestions,
    getAddressDescription,
    deviceLocation,
    addressSuggestions,
    updateAddress: setAddress,
    addAddressToFavorites,
    address,
  };
};

export default useLocation;
