import { existsSync, PathLike, writeFile } from 'fs';
import mkdirp = require('mkdirp');
import * as path from 'path';
import { OUTPUT_FILE_NAME } from '../constants';
import { JsonObject } from '../interfaces';
import { dts } from './ast';
import { flattenKeys } from './parser';

export interface GenerateOptions {
  pluralizationKeys?: string[];
}

export const generate = (
  translations: JsonObject,
  dirPath: string,
  options: GenerateOptions = {},
): Promise<void> => {
  if (!existsSync(dirPath)) {
    mkdirp.sync(dirPath);
  }
  const keys = flattenKeys(translations, options.pluralizationKeys);
  const data = dts(keys);
  const outputPath = path.join(dirPath, OUTPUT_FILE_NAME);
  return execWriteFile(outputPath, data);
};

const execWriteFile = (pathFile: PathLike, data: string): Promise<void> =>
  new Promise<void>((resolve, reject) => {
    writeFile(pathFile, data, error => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
