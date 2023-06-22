import { IAddress } from '../../hooks/useLocation/types';

interface ILocationsProps {
  locations: IAddress[];
  onLocationDelete: (location: IAddress) => void;
}

export type { ILocationsProps };
