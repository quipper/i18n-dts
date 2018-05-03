declare module "react-native-i18n" {
    var fallbacks: boolean;
    var translations: {
        [keys: string]: any;
    };
    function t(key: "common.cancel", opts: {
        value: any;
    }): string;
}

declare module "*.json" {
    const value: any;
    export default value;
}