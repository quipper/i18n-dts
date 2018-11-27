import { existsSync } from 'fs';
import * as path from 'path';
import { CONFIG_NAME, PACKAGE_JSON } from '../constants';
import { Config, JsonObject } from '../interfaces';

export const getConfigFromPackageJson = (dir: string): Config | Error => {
  const packageJsonPath = path.join(dir, PACKAGE_JSON);
  if (!existsSync(packageJsonPath)) {
    return Error('package.json does not exist on root directory');
  }
  const config = require(packageJsonPath)[CONFIG_NAME];
  if (!config) {
    return Error(`\"${CONFIG_NAME}\" property does not exist on package.json`);

  }
  return {
    model: config.model,
    outputDir: config.outputDir,
  };
};

export const isJson = (extname: string): boolean => {
  return extname.endsWith('.json');
};

export const isSource = (extname: string): boolean => {
  return extname.endsWith('.ts') || extname.endsWith('.js');
};

export const getTranslationFromModel = (
  filePath: string,
): JsonObject | Error => {
  if (!existsSync(filePath)) {
    return Error('model file does not exist');
  }
  const extname = path.extname(filePath);
  if (isJson(extname) || isSource(extname)) {
    return require(filePath) as JsonObject;
  }
  return Error('file extension type should be either .json or .ts|.js');
};
