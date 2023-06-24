/**
 *
 * WeatherForecastView
 *
 */

import React from 'react';
import * as icons from '../../assets';
import Button from '../button';
import { StyledText } from '../common';
import { WeatherCondition } from '../currentDayWeatherView/enums';
import TemperatureInDegrees from '../temperatureInDegrees';
import {
  StyledDayContainer,
  StyledTemperatureInDegrees,
  StyledWeatherForecastView,
  StyledWeatherForecastViewContainer,
  StyledWeatherIcon,
  StyledActionsWrapper,
} from './styles';
import { IWeatherForecastViewProps } from './types';
function WeatherForecastView({
  weatherForecast,

  onAddToFavorites,
}: IWeatherForecastViewProps): JSX.Element {
  const getIconByType = (type: string) => {
    switch (type) {
      case WeatherCondition.Sunny:
        return icons.sunnyIcon;
      case WeatherCondition.Cloudy:
        return icons.cloudyIcon;
      case WeatherCondition.Rainy:
        return icons.rainyIcon;
      default:
        return icons.sunnyIcon;
    }
  };

  return (
    <>
      <StyledWeatherForecastViewContainer>
        {weatherForecast.map(({ type, day, temperature }, index) => (
          <StyledWeatherForecastView
            key={day}
            isLastItem={index === weatherForecast.length - 1}
          >
            <StyledDayContainer>
              <StyledText fontSize={18}>{day}</StyledText>
            </StyledDayContainer>
            <StyledWeatherIcon source={getIconByType(type)} />
            <StyledTemperatureInDegrees>
              <TemperatureInDegrees
                temperature={temperature}
                degreeOffset={-12}
                symbolSize={10}
                fontSize={18}
                fontWeight={700}
              />
            </StyledTemperatureInDegrees>
          </StyledWeatherForecastView>
        ))}
      </StyledWeatherForecastViewContainer>
      <StyledActionsWrapper>
        <Button title="Add to favorites" onPress={onAddToFavorites} />
      </StyledActionsWrapper>
    </>
  );
}

export default WeatherForecastView;
