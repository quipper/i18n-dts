import { INTERPOLATION_PATTERN } from '../constants';
import { JsonObject, Translation } from '../interfaces';

export const extractInterpolations = (str: string): string[] => {
  const interpolations = [];
  while (true) {
    const matches = str.match(INTERPOLATION_PATTERN);
    if (!matches) {
      break;
    }
    interpolations.push(matches[1]);
    str = str.replace(INTERPOLATION_PATTERN, '');
  }
  return interpolations;
};

export const flattenKeys = (
  json: JsonObject,
  prefix: string | undefined = undefined,
  result: Translation[] = [],
): Translation[] => {
  Object.keys(json).forEach(key => {
    const flatKey = prefix ? `${prefix}.${key}` : key;
    const value = json[key];
    if (typeof value === 'object') {
      flattenKeys(value, flatKey, result);
    } else {
      const interpolations = extractInterpolations(value);
      result.push({ key: flatKey, value, interpolations });
    }
  });
  return result;
};
