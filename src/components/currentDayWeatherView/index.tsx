/**
 *
 * CurrentDayWeatherView
 *
 */

import React from 'react';

import { StyledText } from '../common';
import CurrentDayWeatherSummary from '../currentDayWeatherSummary';
import TemperatureInDegrees from '../temperatureInDegrees';

import {
  StyledCurrentDayWeatherView,
  StyledCurrentDayWeatherViewContainer,
  StyledTemperature,
} from './styles';
import { ICurrentDayWeatherViewProps } from './types';

function CurrentDayWeatherView({
  todaysWeather: {
    minimumTemperature,
    maximumTemperature,
    currentTemperature,
    description,
  },
}: ICurrentDayWeatherViewProps): JSX.Element {
  return (
    <StyledCurrentDayWeatherViewContainer>
      <StyledCurrentDayWeatherView>
        <StyledTemperature>
          <TemperatureInDegrees
            temperature={currentTemperature}
            fontWeight={800}
            fontSize={30}
            isUpperCase
          />
        </StyledTemperature>
        <StyledText isUpperCase fontWeight={600} fontSize={25}>
          {description}
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
