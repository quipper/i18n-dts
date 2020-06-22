import {
  INTERPOLATION_PATTERN,
  DEFAULT_PLURALIZATION_KEYS,
} from '../constants';
import { JsonObject, Translation } from '../interfaces';

export const isPluralized = (
  json: JsonObject,
  pluralizationKeys = DEFAULT_PLURALIZATION_KEYS,
) =>
  Object.keys(json).length > 0 &&
  Object.keys(json).every(key => pluralizationKeys.includes(key));

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
  pluralizationKeys?: string[],
  prefix: string | undefined = undefined,
  result: Translation[] = [],
): Translation[] => {
  Object.keys(json).forEach(key => {
    const flatKey = prefix ? `${prefix}.${key}` : key;
    const value = json[key];
    if (typeof value === 'object') {
      if (isPluralized(value, pluralizationKeys)) {
        let interpolations = ['count'];
        const values: string[] = [];
        Object.keys(value).map(key => {
          const pluralValue: string = value[key];
          interpolations = interpolations.concat(
            extractInterpolations(pluralValue),
          );
          values.push(pluralValue);
        });
        result.push({ key: flatKey, value: values, interpolations });
      } else {
        flattenKeys(value, pluralizationKeys, flatKey, result);
      }
    } else {
      const interpolations = extractInterpolations(value);
      result.push({ key: flatKey, value, interpolations });
    }
  });
  return result;
};
