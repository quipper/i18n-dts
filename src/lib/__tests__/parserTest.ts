import { extractInterpolations, flattenKeys } from '../parser';

describe('parser', () => {
  describe('extractInterpolations', () => {
    it('returns empty array', () => {
      expect(extractInterpolations('test')).toEqual([]);
    });

    it('returns single matched string', () => {
      expect(extractInterpolations('{{test}}')).toEqual(['test']);
    });

    it('returns multiple matched strings', () => {
      expect(extractInterpolations('{{test}} {{test1}}')).toEqual([
        'test',
        'test1',
      ]);
    });
  });

  describe('flattenKeys', () => {
    it('returns flatten key', () => {
      expect(
        flattenKeys({
          common: {
            cancel: 'Cancel',
          },
        }),
      ).toEqual([
        {
          interpolations: [],
          key: 'common.cancel',
          value: "Cancel"
        },
      ]);
    });

    it('returns flatten key with interpolation', () => {
      expect(
        flattenKeys({
          common: {
            cancel: 'Cancel {{value}}',
          },
        }),
      ).toEqual([
        {
          interpolations: ['value'],
          key: 'common.cancel',
          value: "Cancel {{value}}",
        },
      ]);
    });
  });
});
