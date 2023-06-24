import { ModalType } from '../components/modal/enums';
import { TemperatureUnit } from '../hooks/useWeather/enums';
import { IContext, IModalState, IUserContext } from './types';

const defaultModal: IModalState = {
  message: 'Hello',
  isVisible: false,
  title: 'Delete you',
  primaryAction: () => false,
  secondaryAction: () => false,
  primaryActionTitle: 'Delete',
  secondaryActionTitle: 'Cancel',
  type: ModalType.Warning,
  isTransparent: true,
  presentationStyle: 'overFullScreen',
};

const defaultUserProfile: IUserContext = {
  profile: {
    favoriteLocations: [],
    id: '5',
  },
  updateProfile: () => false,
  addFavoriteLocation: () => false,
  removeFavoriteLocation: () => false,
};

const contextInitialState: IContext = {
  api: {
    todaysWeather: undefined,
    weatherForecast: [],
    activeMetric: TemperatureUnit.Metric,
    updateWeatherUnit: () => false,
    updateTodaysWeather: () => false,
    updateWeatherForecast: () => false,
    address: undefined,
    updateAddress: () => false,
  },
  ui: {
    modalState: defaultModal,
    showModal: () => false,
    hideModal: () => false,
    isLoading: true,
    toggleLoader: () => false,
  },
  user: {
    profile: defaultUserProfile.profile,
    updateProfile: () => false,
    addFavoriteLocation: () => false,
    removeFavoriteLocation: () => false,
  },
};

export { defaultModal, defaultUserProfile, contextInitialState };
