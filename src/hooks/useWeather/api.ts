import { makeApiCall } from '../../utils';
import { API_KEY } from './constants';
import { TemperatureUnit } from './enums';
import { IApiResponse, IWeatherRequestPayload } from './types';

const getTodaysWeatherByLocation = async ({
  latitude,
  longitude,
  unit = TemperatureUnit.Metric,
}: IWeatherRequestPayload): Promise<IApiResponse> =>
  await makeApiCall({
    method: 'get',
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${unit}`,
  });

const getWeatherForecastByLocation = async ({
  latitude,
  longitude,
  unit = TemperatureUnit.Metric,
}: IWeatherRequestPayload): Promise<IApiResponse> =>
  await makeApiCall({
    url: `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${unit}`,
    method: 'get',
  });

export { getTodaysWeatherByLocation, getWeatherForecastByLocation };
