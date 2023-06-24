import { IAddress } from '../../hooks/useLocation/types';

interface ILocationsProps {
  locations: IAddress[];
  onLocationDelete: (index: number) => void;
  onLocationSelect: (location: IAddress) => void;
}

export type { ILocationsProps };
