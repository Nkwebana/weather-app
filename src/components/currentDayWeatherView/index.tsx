/**
 *
 * CurrentDayWeatherView
 *
 */

import React from 'react';
import { StyledText } from '../common';
import CurrentDayWeatherSummary from '../currentDayWeatherSummary';
import TemperatureInDegrees from '../temperatureInDegrees';
import * as images from '../../assets';
import {
  StyledCurrentDayWeatherView,
  StyledCurrentDayWeatherViewContainer,
  StyledTemperature,
} from './styles';
import { ICurrentDayWeatherViewProps } from './types';
import { WeatherCondition, WeatherConditionType } from './enums';

function CurrentDayWeatherView({
  todaysWeather: {
    minimumTemperature,
    maximumTemperature,
    currentTemperature,
    type,
  },
}: ICurrentDayWeatherViewProps): JSX.Element {
  const getImageAndBackgroundColorKeyByType = () => {
    switch (type) {
      case WeatherCondition.Sunny:
        return WeatherConditionType.Sunny.toLowerCase();
      case WeatherCondition.Cloudy:
        return WeatherConditionType.Cloudy.toLowerCase();
      case WeatherCondition.Rainy:
        return WeatherConditionType.Rainy.toLowerCase();
      default:
        return WeatherConditionType.Sunny.toLowerCase();
    }
  };

  const getWeatherCondition = () => {
    switch (type) {
      case WeatherCondition.Sunny:
        return WeatherConditionType.Sunny;
      case WeatherCondition.Cloudy:
        return WeatherConditionType.Cloudy;
      case WeatherCondition.Rainy:
        return WeatherConditionType.Rainy;
      default:
        return WeatherConditionType.Sunny;
    }
  };

  return (
    <StyledCurrentDayWeatherViewContainer>
      <StyledCurrentDayWeatherView
        source={
          images[getImageAndBackgroundColorKeyByType() as keyof typeof images]
        }
        resizeMode="cover"
      >
        <StyledTemperature>
          <TemperatureInDegrees
            temperature={currentTemperature}
            fontWeight={800}
            fontSize={30}
            isUpperCase
          />
        </StyledTemperature>
        <StyledText isUpperCase fontWeight={600} fontSize={25}>
          {getWeatherCondition()}
        </StyledText>
      </StyledCurrentDayWeatherView>
      <CurrentDayWeatherSummary
        minimumTemperature={minimumTemperature}
        maximumTemperature={maximumTemperature}
        currentTemperature={currentTemperature}
      />
    </StyledCurrentDayWeatherViewContainer>
  );
}

export default CurrentDayWeatherView;
