declare module "i18n-js" {
    var fallbacks: boolean;
    var translations: {
        [keys: string]: any;
    };
    var defaultLocale: string;
    var locale: string;
    function currentLocale(): string;
    function t(key: "common.items", opts: {
        count: any;
    }): "One item." | "{{count}} items.";
    function t(key: "common.uncountedItems"): "One item." | "Many items.";
}

declare module "*.json" {
    const value: any;
    export default value;
}
