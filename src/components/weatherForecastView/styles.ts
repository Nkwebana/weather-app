import styled from 'styled-components/native';
import { IStyledWeatherForecastViewProps } from './types';

const StyledWeatherForecastViewContainer = styled.ScrollView`
  background-color: ${({
    theme: {
      colors: { primary },
    },
  }) => primary};
  padding: 20px;
`;

const StyledActionsWrapper = styled.View`
  padding: 20px;
  background: ${({
    theme: {
      colors: { primary },
    },
  }) => primary};
`;

const StyledWeatherForecastView = styled.View<IStyledWeatherForecastViewProps>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  margin-bottom: ${({ isLastItem }) => (isLastItem ? '30px' : 0)};
`;

const StyledForecastWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const StyledWeatherIcon = styled.Image`
  height: 35px;
  width: 35px;
`;

const StyledDayContainer = styled.View`
  width: 95px;
`;

const StyledTemperatureInDegrees = styled.View`
  width: 95px;
  padding-right: 5px;
  flex-direction: row;
  justify-content: flex-end;
`;

export {
  StyledDayContainer,
  StyledForecastWrapper,
  StyledTemperatureInDegrees,
  StyledWeatherForecastView,
  StyledWeatherForecastViewContainer,
  StyledWeatherIcon,
  StyledActionsWrapper,
};
