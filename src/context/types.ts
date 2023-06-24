import { ModalType } from '../components/modal/enums';
import { IAddress } from '../hooks/useLocation/types';
import { TemperatureUnit } from '../hooks/useWeather/enums';
import { ITodaysWeather, IWeatherForecast } from '../hooks/useWeather/types';

interface IAppContextProvider {
  children: JSX.Element;
}

interface IModalState {
  message?: string;
  isVisible?: boolean;
  title: string;
  primaryAction?: () => void;
  secondaryAction?: () => void;
  primaryActionTitle?: string;
  secondaryActionTitle?: string;
  type: ModalType;
  children?: JSX.Element;
  presentationStyle?:
    | 'fullScreen'
    | 'pageSheet'
    | 'formSheet'
    | 'overFullScreen';
  isTransparent?: boolean;
}

interface IUiContext {
  modalState: IModalState;
  showModal: (modalState: IModalState) => void;
  hideModal: () => void;
  isLoading: boolean;
  toggleLoader: (isLoading: boolean) => void;
}

interface IUserProfileState {
  id: string;
  favoriteLocations: IAddress[];
}

interface IUserContext {
  profile: IUserProfileState;
  updateProfile: (profile: IUserProfileState) => void;
  addFavoriteLocation: (address: IAddress) => void;
  removeFavoriteLocation: (index: number) => void;
}

interface IApi {
  todaysWeather: ITodaysWeather | undefined;
  weatherForecast: IWeatherForecast[] | undefined;
  activeMetric: TemperatureUnit;
  address: IAddress | undefined;
  updateTodaysWeather: (weather: ITodaysWeather) => void;
  updateWeatherForecast: (forecast: IWeatherForecast[]) => void;
  updateWeatherUnit: (unit: TemperatureUnit) => void;
  updateAddress: (newAddress: IAddress) => void;
}

interface IContext {
  api: IApi;
  ui: IUiContext;
  user: IUserContext;
}

export type {
  IAppContextProvider,
  IModalState,
  IUserProfileState,
  IContext,
  IUserContext,
};
