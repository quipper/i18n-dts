declare module "i18n-js" {
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
    function t(key: "common.ok"): string;
}

declare module "*.json" {
    const value: any;
    export default value;
}