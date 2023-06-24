import React, { createContext, useCallback, useContext, useState } from 'react';
import Modal from '../components/modal';
import { ModalType } from '../components/modal/enums';
import useHydration from '../hooks/useHydration';
import { IAddress } from '../hooks/useLocation/types';
import { contextInitialState, defaultModal, defaultUserProfile } from './mocks';
import {
  IAppContextProvider,
  IModalState,
  IUserProfileState,
  IContext,
} from './types';
import { ITodaysWeather, IWeatherForecast } from '../hooks/useWeather/types';
import { TemperatureUnit } from '../hooks/useWeather/enums';
import Loader from '../components/loader';

const AppContext = createContext<IContext>(contextInitialState);

export const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }: IAppContextProvider) => {
  const [modalState, setModalState] = useState<IModalState>(defaultModal);
  const [profile, setProfile] = useState<IUserProfileState>(
    defaultUserProfile.profile,
  );
  const [todaysWeather, setTodaysWeather] = useState<ITodaysWeather>();
  const [weatherForecast, setWeatherForecast] = useState<IWeatherForecast[]>();
  const [activeMetric, setActiveMetric] = useState<TemperatureUnit>(
    TemperatureUnit.Metric,
  );
  const [address, setAddress] = useState<IAddress>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { hydrateSandbox } = useHydration();

  const showModal = useCallback(
    ({
      title,
      primaryAction,
      secondaryAction,
      primaryActionTitle,
      secondaryActionTitle,
      type,
      message,
      children: modalChildren,
      presentationStyle,
    }: IModalState) => {
      setModalState({
        message,
        isVisible: true,
        title,
        primaryAction,
        secondaryAction,
        primaryActionTitle,
        secondaryActionTitle,
        type,
        children: modalChildren,
        presentationStyle,
      });
    },
    [],
  );

  const hideModal = useCallback(() => {
    setModalState(defaultModal);
  }, []);

  const updateProfile = useCallback((newProfile: IUserProfileState) => {
    setProfile(newProfile);
  }, []);

  const addFavoriteLocation = useCallback(
    (newAddress: IAddress) => {
      const isAddressAlreadyInFavorites = profile.favoriteLocations.find(
        ({ coords, title }) =>
          title === newAddress.title &&
          coords.latitude === newAddress.coords.latitude &&
          coords.longitude === newAddress.coords.longitude,
      );

      if (isAddressAlreadyInFavorites) {
        return showModal({
          title: 'Error',
          message: 'Location is already in favorites',
          type: ModalType.Error,
          primaryActionTitle: 'OK',
          primaryAction: hideModal,
          presentationStyle: 'overFullScreen',
          isTransparent: true,
        });
      }

      profile.favoriteLocations.push(newAddress);

      setProfile({ ...profile });
      hydrateSandbox({ ...profile });
    },
    [profile, hydrateSandbox, showModal, hideModal],
  );

  const toggleLoader = useCallback(
    (isLoaderActive: boolean) => setIsLoading(isLoaderActive),
    [],
  );

  const updateAddress = (newAddress: IAddress) => setAddress(newAddress);

  const removeFavoriteLocation = (locationIndex: number) => {
    profile.favoriteLocations.splice(locationIndex, 1);

    setProfile({ ...profile });
    hydrateSandbox({ ...profile });
  };

  const updateWeatherUnit = useCallback((metric: TemperatureUnit) => {
    setActiveMetric(metric);
  }, []);

  const updateTodaysWeather = useCallback(
    (weather: ITodaysWeather) => setTodaysWeather(weather),
    [],
  );

  const updateWeatherForecast = useCallback(
    (forecast: IWeatherForecast[]) => setWeatherForecast(forecast),
    [],
  );

  return (
    <AppContext.Provider
      value={{
        api: {
          todaysWeather,
          weatherForecast,
          activeMetric,
          address,
          updateTodaysWeather,
          updateWeatherForecast,
          updateWeatherUnit,
          updateAddress,
        },
        ui: {
          modalState,
          isLoading,
          showModal,
          hideModal,
          toggleLoader,
        },
        user: {
          profile,
          updateProfile,
          addFavoriteLocation,
          removeFavoriteLocation,
        },
      }}
    >
      {children}
      <Modal />
      <Loader />
    </AppContext.Provider>
  );
};

export default AppContextProvider;
