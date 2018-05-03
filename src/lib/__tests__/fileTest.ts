import * as path from 'path';
import { getConfigFromPackageJson, isJson, isSource } from '../file';

describe('file', () => {
  describe('getConfigFromPackageJson', () => {
    it('returns error with wrong directory', () => {
      const error = getConfigFromPackageJson(
        path.resolve('./src/lib/__tests__/fixtures/wrongdir'),
      );
      expect(error instanceof Error).toBeTruthy();
      expect((error as Error).message).toEqual(
        'package.json does not exist on root directory',
      );
    });

    it('returns error with no property json', () => {
      const error = getConfigFromPackageJson(
        path.resolve('./src/lib/__tests__/fixtures/noprop'),
      );
      expect(error instanceof Error).toBeTruthy();
      expect((error as Error).message).toEqual(
        '"react-native-i18n" property does not exist on package.json',
      );
    });

    it('returns error with invalid package.json', () => {
      const error = getConfigFromPackageJson(
        path.resolve('./src/lib/__tests__/fixtures/noprop'),
      );
      expect(error instanceof Error).toBeTruthy();
      expect((error as Error).message).toEqual(
        '"react-native-i18n" property does not exist on package.json',
      );
    });

    it('returns config with valid package.json', () => {
      const config = getConfigFromPackageJson(
        path.resolve('./src/lib/__tests__/fixtures/valid'),
      );
      expect(config instanceof Error).toBeFalsy();
      expect(config).toEqual({
        model: './en.json',
        outputDir: './typings',
      });
    });
  });

  describe('isJson', () => {
    it('returns true', () => {
      expect(isJson('.json')).toBeTruthy();
    });
    it('returns false', () => {
      expect(isJson('.jsonp')).toBeFalsy();
    });
    it('returns true', () => {
      expect(isSource('.ts')).toBeTruthy();
      expect(isSource('.js')).toBeTruthy();
    });
    it('returns false', () => {
      expect(isSource('.json')).toBeFalsy();
    });
  });
});
