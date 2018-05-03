import { dts } from '../ast';
import { readFile } from './utils';

describe('ast', () => {
  describe('dts', () => {
    it('returns dts file with no translation', () => {
      const actual = dts([]);
      const expected = readFile('./src/lib/__tests__/expected/no-keys.d.ts');
      expect(actual).toEqual(expected);
    });

    it('returns dts file with one translation', () => {
      const actual = dts([
        {
          interpolations: ['value'],
          key: 'common.cancel',
        },
      ]);
      const expected = readFile('./src/lib/__tests__/expected/one-key.d.ts');
      expect(actual).toEqual(expected);
    });

    it('returns dts file with multiple translations', () => {
      const actual = dts([
        {
          interpolations: ['value'],
          key: 'common.cancel',
        },
        {
          interpolations: [],
          key: 'common.ok',
        },
      ]);
      const expected = readFile(
        './src/lib/__tests__/expected/multiple-keys.d.ts',
      );
      expect(actual).toEqual(expected);
    });
  });
});
