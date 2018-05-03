import { mkdirSync, unlinkSync, rmdirSync } from 'fs';
import * as path from 'path';
import { OUTPUT_FILE_NAME } from '../../constants';
import { generate } from '../generate';
import { readFile } from './utils';

describe('generate', () => {
  const dirPath = './src/lib/__tests__/generated/';
  const filePath = `${dirPath}${OUTPUT_FILE_NAME}`;

  beforeAll(() => {
    mkdirSync(dirPath);
  });

  afterAll(() => {
    rmdirSync(dirPath);
  });

  afterEach(() => {
    unlinkSync(filePath);
  });

  it('writes d.ts file with no key', async () => {
    expect.assertions(1);
    return generate({}, path.resolve(dirPath)).then(() => {
      const actual = readFile(filePath);
      const expected = readFile('./src/lib/__tests__/expected/no-keys.d.ts');
      expect(actual).toEqual(expected);
    });
  });

  it('writes d.ts file with one key', async () => {
    expect.assertions(1);
    return generate(
      {
        'common.cancel': 'Cancel {{value}}',
      },
      path.resolve(dirPath),
    ).then(() => {
      const actual = readFile(filePath);
      const expected = readFile('./src/lib/__tests__/expected/one-key.d.ts');
      expect(actual).toEqual(expected);
    });
  });

  it('writes d.ts file with multiple keys', async () => {
    expect.assertions(1);
    return generate(
      {
        'common.cancel': 'Cancel {{value}}',
        'common.ok': 'OK',
      },
      path.resolve(dirPath),
    ).then(() => {
      const actual = readFile(filePath);
      const expected = readFile(
        './src/lib/__tests__/expected/multiple-keys.d.ts',
      );
      expect(actual).toEqual(expected);
    });
  });
});
