# react-native-typed-i18n [![CircleCI](https://circleci.com/gh/quipper/react-native-typed-i18n.svg?style=svg)](https://circleci.com/gh/quipper/react-native-typed-i18n) [![npm version](https://badge.fury.io/js/react-native-typed-i18n.svg)](https://badge.fury.io/js/react-native-typed-i18n)

`react-native-typed-i18n` is a tiny `d.ts` file generator for [react-native-i18n](https://github.com/AlexanderZaytsev/react-native-i18n).

With generated `d.ts` file you can treat `i18n` object type-safely as below!

![demo](https://raw.githubusercontent.com/quipper/react-native-typed-i18n/master/doc/demo.gif)

## Installation

```sh
npm install --save react-native-typed-i18n # npm
yarn add react-native-typed-i18n # yarn
```

## Configuration

First of all specify the following settings in root `package.json`.

- `model`: file extension type can be either `.json`, `.ts` or `.js`
- `outputDir`: `d.ts` file will be emitted in specified directory

```json
"react-native-typed-i18n": {
  "model": "./src/locale/languages/en.json",
  "outputDir": "./typings"
}
```

Note that when you specify `.ts` or `.js` file as a model, use `module.exports` to export an object.

```ts
module.exports = {
  platform: {
    ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
  },
};
```

And add `outputDir` dir to `filesGlob` option in `tsconfig.json`.

```json
"filesGlob": [
  "typings/*.d.ts",
],
```

That's it! Now you can use `typed-i18n` command which generates corresponding `d.ts` file.

We recommend to add scripts into `package.json`.

```json
"scripts": {
  "typed-i18n": "typed-i18n",
  "typed-i18n:watch": "typed-i18n -w"
},
```

Check [example](https://github.com/quipper/react-native-typed-i18n/example) project for more detail.

## Options

### Watch mode

You can enable watch mode by adding `--watch` (shorthand `-w`) flag.

In the watch mode, react-native-typed-i18n watches update of model file and generates declaration file when the model file is updated.

```sh
typed-i18n --watch
```

## Licence

```
Copyright 2018 Quipper Limited.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
