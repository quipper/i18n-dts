import { existsSync, PathLike, writeFile } from 'fs';
import mkdirp = require('mkdirp');
import * as path from 'path';
import { OUTPUT_FILE_NAME } from '../constants';
import { JsonObject } from '../interfaces';
import { dts } from './ast';
import { flattenKeys } from './parser';

export const generate = (
  translations: JsonObject,
  dirPath: string,
): Promise<void> => {
  if (!existsSync(dirPath)) {
    mkdirp.sync(dirPath);
  }
  const keys = flattenKeys(translations);
  const data = dts(keys);
  const outputPath = path.join(dirPath, OUTPUT_FILE_NAME);
  return execWrite(outputPath, data);
};

const execWrite = (pathFile: PathLike, data: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    writeFile(pathFile, data, error => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};
