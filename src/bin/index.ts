#!/usr/bin/env node

import program = require('commander');
import path = require('path');
import { OUTPUT_FILE_NAME } from '../constants';
import { Config, JsonObject } from '../interfaces';
import { getConfigFromPackageJson, getTranslationFromModel } from '../lib/file';
import { generate } from '../lib/generate';
import { watch } from '../lib/watch';

program
  .option('-w, --watch', 'watch file change')
  .option(
    '-k, --pluralization-keys <keys>',
    'customize keys used for pluralization, comma separated e.g. "few,many"',
    value => value.split(','),
  )
  .parse(process.argv);

const configOrError = getConfigFromPackageJson(process.cwd());
if (configOrError instanceof Error) {
  console.error(configOrError.message);
  process.exit(1);
}

const config = configOrError as Config;
const modelPath = path.resolve(config.model);
const outputPath = path.resolve(config.outputDir);

const { pluralizationKeys } = program;
if (program.watch) {
  watch(modelPath, outputPath, { pluralizationKeys });
} else {
  const translationOrError = getTranslationFromModel(modelPath);
  if (translationOrError instanceof Error) {
    console.error(translationOrError.message);
    process.exit(1);
  }
  const translation = translationOrError as JsonObject;
  generate(translation, outputPath, { pluralizationKeys })
    .then(() =>
      console.info(`Emitted: ${path.join(outputPath, OUTPUT_FILE_NAME)}`),
    )
    .catch(error =>
      console.error(`Error occurred while emitting: ${error.message}`),
    );
}
