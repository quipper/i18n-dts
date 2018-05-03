declare module "react-native-i18n" {
    var fallbacks: boolean;
    var translations: {
        [keys: string]: any;
    };
}

declare module "*.json" {
    const value: any;
    export default value;
}