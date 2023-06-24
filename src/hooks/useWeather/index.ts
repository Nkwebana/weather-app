import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { ModalType } from '../../components/modal/enums';
import { useAppContext } from '../../context';
import {
  formatTodaysWeatherResponse,
  formatWeatherForecastResponse,
} from '../../utils';
import {
  getTodaysWeatherByLocation,
  getWeatherForecastByLocation,
} from './api';
import {
  IApiResponse,
  ICoordinates,
  ITodaysWeatherResponse,
  IWeatherForecastResponse,
  IWeatherRequestPayload,
} from './types';

function useWeather() {
  const [
    shouldRetryTodaysWeatherCall,
    setShouldRetryTodaysWeatherCall,
  ] = useState<boolean>(false);

  const {
    ui: { showModal, hideModal, toggleLoader },
    api: { activeMetric, updateTodaysWeather, updateWeatherForecast },
  } = useAppContext();

  const {
    mutate: getTodaysWeather,
    isLoading: isFetchingTodaysWeather,
  } = useMutation<IApiResponse, unknown, IWeatherRequestPayload>(
    'getTodaysWeather',
    ({ latitude, longitude, unit }: IWeatherRequestPayload) =>
      getTodaysWeatherByLocation({ latitude, longitude, unit }),
    {
      onSuccess: ({ result, ok, error }: IApiResponse) => {
        if (error) {
          return showModal({
            title: 'Get Weather Error',
            message: new Error(error as string).message,
            primaryActionTitle: 'Retry',
            presentationStyle: 'fullScreen',
            isTransparent: true,
            primaryAction: () => {
              setShouldRetryTodaysWeatherCall(true);
            },
            secondaryActionTitle: 'Cancel',
            secondaryAction: () => {
              hideModal();
            },
            type: ModalType.Error,
          });
        }

        if (ok && result) {
          const formattedData = formatTodaysWeatherResponse(
            result as ITodaysWeatherResponse,
          );

          updateTodaysWeather(formattedData);
        }
      },
    },
  );

  const {
    mutate: getWeatherForecast,
    isLoading: isFetchingWeatherForecast,
  } = useMutation(
    'getWeatherForeCast',
    (coords: ICoordinates) =>
      getWeatherForecastByLocation({ ...coords, unit: activeMetric }),
    {
      onSuccess: ({ result, error, ok }: IApiResponse) => {
        toggleLoader(false);
        if (error) {
          return showModal({
            title: 'Error',
            message: new Error(error as string).message,
            primaryActionTitle: 'Retry',
            presentationStyle: 'fullScreen',
            isTransparent: true,
            primaryAction: () => {
              // act on primary action
            },
            secondaryActionTitle: 'Cancel',
            secondaryAction: () => {
              hideModal();
            },
            type: ModalType.Error,
          });
        }

        if (result && ok) {
          const formattedData = formatWeatherForecastResponse(
            result as IWeatherForecastResponse,
          );
          updateWeatherForecast(formattedData);
        }
      },
    },
  );

  useEffect(() => {
    if (isFetchingTodaysWeather || isFetchingWeatherForecast) {
      toggleLoader(true);
    }
  }, [isFetchingWeatherForecast, isFetchingTodaysWeather, toggleLoader]);

  return {
    getTodaysWeather,
    getWeatherForecast,
    shouldRetryTodaysWeatherCall,
  };
}

export default useWeather;
