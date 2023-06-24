interface ICurrentDayWeatherSummaryProps {
  minimumTemperature: number;
  maximumTemperature: number;
  currentTemperature: number;
}

interface IStyledCurrentDayWeatherSummaryProps {
  backgroundColor: string;
}

export type {
  ICurrentDayWeatherSummaryProps,
  IStyledCurrentDayWeatherSummaryProps,
};
