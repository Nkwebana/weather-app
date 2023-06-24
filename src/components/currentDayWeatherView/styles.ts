import styled from 'styled-components/native';

const StyledCurrentDayWeatherViewContainer = styled.View`
  height: 385px;
`;

const StyledCurrentDayWeatherView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({
    theme: {
      colors: { transparency },
    },
  }) => transparency};
`;

const StyledTemperature = styled.View`
  margin-bottom: 10px;
`;

export {
  StyledCurrentDayWeatherView,
  StyledCurrentDayWeatherViewContainer,
  StyledTemperature,
};
