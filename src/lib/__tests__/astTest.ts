import { dts } from '../ast';

describe('ast', () => {
  describe('dts', () => {
    it('returns dts file with no translation', () => {
      const code = dts([]);
      expect(code).toEqual(
        `
declare module \"react-native-i18n\" {
    var fallbacks: boolean;
    var translations: {
        [keys: string]: any;
    };
}

declare module \"*.json\" {
    const value: any;
    export default value;
}
`.trim(),
      );
    });

    it('returns dts file with one translation', () => {
      const code = dts([
        {
          interpolations: ['value'],
          key: 'common.cancel',
        },
      ]);
      expect(code).toEqual(
        `
declare module \"react-native-i18n\" {
    var fallbacks: boolean;
    var translations: {
        [keys: string]: any;
    };
    function t(key: \"common.cancel\", opts: {
        value: any;
    }): string;
}

declare module \"*.json\" {
    const value: any;
    export default value;
}
`.trim(),
      );
    });

    it('returns dts file with multiple translations', () => {
      const code = dts([
        {
          interpolations: [],
          key: 'common.ok',
        },
        {
          interpolations: ['value'],
          key: 'common.cancel',
        },
      ]);
      expect(code).toEqual(
        `
declare module \"react-native-i18n\" {
    var fallbacks: boolean;
    var translations: {
        [keys: string]: any;
    };
    function t(key: \"common.ok\"): string;
    function t(key: \"common.cancel\", opts: {
        value: any;
    }): string;
}

declare module \"*.json\" {
    const value: any;
    export default value;
}
`.trim(),
      );
    });
  });
});
