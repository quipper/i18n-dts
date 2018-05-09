declare module "react-native-i18n" {
    var fallbacks: boolean;
    var translations: {
        [keys: string]: any;
    };
    var defaultLocale: string;
    var locale: string;
    function currentLocale(): string;
    function t(key: "common.cancel", opts: {
        value: any;
    }): string;
}

declare module "*.json" {
    const value: any;
    export default value;
}