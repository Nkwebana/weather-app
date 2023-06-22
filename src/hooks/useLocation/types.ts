import { ILocationResultCoords } from '../../components/autoComplete/types';
import { ICoordinates } from '../useWeather/types';

interface ILocationResultItem {
  address: string;
  location: ILocationResultCoords;
  score?: number;
  attributes?: {
    Addr_type: string;
  };
  extent?: {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
  };
}

interface IGeoCodeResponse {
  spatialReference: {
    wkid: number;
    latestWkid: number;
  };
  candidates: ILocationResultItem[];
}

interface IReverseGeocodeResponse {
  address: {
    AddNum: string;
    Addr_type: string;
    Address: string;
    Block: string;
    City: string;
    CntryName: string;
    CountryCode: string;
    District: string;
    LongLabel: string;
    Match_addr: string;
    MetroArea: string;
    Neighborhood: string;
    PlaceName: string;
    Postal: string;
    PostalExt: string;
    Region: string;
    RegionAbbr: string;
    Sector: string;
    ShortLabel: string;
    Subregion: string;
    Territory: string;
    Type: string;
  };
  location: {
    spatialReference: {
      latestWkid: number;
      wkid: number;
    };
    x: number;
    y: number;
  };
}

interface IAddress {
  title: string;
  coords: ICoordinates;
}

export type {
  IAddress,
  IGeoCodeResponse,
  ILocationResultItem,
  IReverseGeocodeResponse,
};
