import { watchFile } from 'fs';
import * as path from 'path';
import { OUTPUT_FILE_NAME } from '../constants';
import { JsonObject } from '../interfaces';
import { getTranslationFromModel } from './file';
import { generate } from './generate';

export const watch = (filePath: string, outputPath: string) => {
  console.info(`Start watching: ${filePath}`);

  watchFile(filePath, (current, prev) => {
    if (current.mtime === prev.mtime) {
      return;
    }
    console.info('Detect file change');

    const translationOrError = getTranslationFromModel(filePath);
    if (translationOrError instanceof Error) {
      console.error(translationOrError.message);
    }
    const translation = translationOrError as JsonObject;
    generate(translation, outputPath)
      .then(() =>
        console.info(`Emitted: ${path.join(outputPath, OUTPUT_FILE_NAME)}`),
      )
      .catch(error =>
        console.error(`Error occurred while emitting: ${error.message}`),
      );
  });
};
