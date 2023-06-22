import React, { createContext, useCallback, useContext, useState } from 'react';
import Modal from '../components/modal';
import { ModalType } from '../components/modal/enums';
import useHydration from '../hooks/useHydration';
import { IAddress } from '../hooks/useLocation/types';
import { defaultModal, defaultUserProfile } from './mocks';
import {
  IAppContextProvider,
  IModalState,
  IUiContext,
  IUserContext,
  IUserProfileState,
} from './types';

const AppContext = createContext<{
  ui: IUiContext;
  user: IUserContext;
}>({
  ui: {
    modalState: defaultModal,
    showModal: () => false,
    hideModal: () => false,
  },
  user: {
    profile: defaultUserProfile.profile,
    updateProfile: () => false,
    addFavoriteLocation: () => false,
    removeFavoriteLocation: () => false,
  },
});

export const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({ children }: IAppContextProvider) => {
  const [modalState, setModalState] = useState<IModalState>(defaultModal);
  const [profile, setProfile] = useState<IUserProfileState>(
    defaultUserProfile.profile,
  );
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

  const removeFavoriteLocation = (address: IAddress) => {
    const updatedLocations = profile.favoriteLocations.filter(
      ({ coords, title }) =>
        title !== address.title &&
        coords.latitude !== address.coords.latitude &&
        coords.longitude !== address.coords.longitude,
    );

    profile.favoriteLocations = updatedLocations;

    setProfile({ ...profile });
    hydrateSandbox({ ...profile });
  };

  return (
    <AppContext.Provider
      value={{
        ui: {
          modalState,
          showModal,
          hideModal,
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
    </AppContext.Provider>
  );
};

export default AppContextProvider;
