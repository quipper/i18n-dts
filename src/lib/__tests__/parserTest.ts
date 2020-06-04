import { extractInterpolations, flattenKeys, isPluralized } from '../parser';

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

    it('supports both interpolation syntaxes', () => {
      expect(extractInterpolations('{{test}} %{test1}')).toEqual([
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
          value: 'Cancel',
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
          value: 'Cancel {{value}}',
        },
      ]);
    });

    it('handles pluralized objects', () => {
      expect(
        flattenKeys({
          common: {
            items: {
              one: 'One {{type}} item.',
              other: 'Many {{type}} items.',
            },
          },
        }),
      ).toEqual([
        {
          interpolations: ['count', 'type', 'type'],
          key: 'common.items',
          value: ['One {{type}} item.', 'Many {{type}} items.'],
        },
      ]);
    });
  });

  describe('isPluralized', () => {
    it('returns true for objects that only contain pluralization keys', () => {
      expect(
        isPluralized({
          one: 'test',
          other: 'test',
          zero: 'test',
        }),
      ).toEqual(true);
    });

    it('returns false for objects that containa keys that are not pluralization keys', () => {
      expect(
        isPluralized({
          one: 'test',
          other: 'test',
          zero: 'test',
          somethingElse: 'test',
        }),
      ).toEqual(false);
    });

    it('returns false for empty objects', () => {
      expect(isPluralized({})).toEqual(false);
    });
  });
});
