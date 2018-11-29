import * as path from 'path';
import { CONFIG_NAME } from '../../constants';
import {
  getConfigFromPackageJson,
  getTranslationFromModel,
  isJson,
  isSource,
} from '../file';

describe('file', () => {
  describe('getConfigFromPackageJson', () => {
    it('returns error with wrong directory', () => {
      const error = getConfigFromPackageJson(
        path.resolve('./src/lib/__tests__/fixtures/not_exist'),
      );
      expect(error instanceof Error).toBeTruthy();
      expect((error as Error).message).toEqual(
        'package.json does not exist on root directory',
      );
    });

    it('returns error with no property json', () => {
      const error = getConfigFromPackageJson(
        path.resolve('./src/lib/__tests__/fixtures/no_config'),
      );
      expect(error instanceof Error).toBeTruthy();
      expect((error as Error).message).toEqual(
        `\"${CONFIG_NAME}\" property does not exist on package.json`,
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
  });

  describe('isSource', () => {
    it('returns true', () => {
      expect(isSource('.ts')).toBeTruthy();
      expect(isSource('.js')).toBeTruthy();
    });
    it('returns false', () => {
      expect(isSource('.json')).toBeFalsy();
    });
  });

  describe('getTranslationFromModel', () => {
    it('returns error with no model file', () => {
      const error = getTranslationFromModel(
        path.resolve('./src/lib/__tests__/fixtures/not_exist'),
      );
      expect(error instanceof Error).toBeTruthy();
      expect((error as Error).message).toEqual('model file does not exist');
    });

    it('returns error with wrong file extension', () => {
      const error = getTranslationFromModel(
        path.resolve('./src/lib/__tests__/fixtures/wrong_ext_name/package.jsonp'),
      );
      expect(error instanceof Error).toBeTruthy();
      expect((error as Error).message).toEqual(
        'file extension type should be either .json or .ts|.js',
      );
    });

    it('returns json object with json file', () => {
      const config = getTranslationFromModel(
        path.resolve('./src/lib/__tests__/fixtures/valid/package.json'),
      );
      expect(config instanceof Error).toBeFalsy();
      expect(config).toEqual({
        'i18n-dts': {
          model: './en.json',
          outputDir: './typings',
        },
      });
    });
  });
});
