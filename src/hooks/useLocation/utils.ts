import { IAutoCompleteSelectOption } from '../../components/autoComplete/types';
import { ILocationResultItem } from './types';

const formatLocationSearchResults = (
  results: ILocationResultItem[],
): IAutoCompleteSelectOption[] =>
  results.map(({ address: title, location: value }) => ({
    title,
    value,
  }));

export { formatLocationSearchResults };
