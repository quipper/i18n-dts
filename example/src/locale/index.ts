import i18n from 'i18n-js';
import RNLanguages from 'react-native-languages';
import { en, ja } from './languages';

i18n.locale = RNLanguages.language;
i18n.fallbacks = true;
i18n.translations = {
  en,
  ja,
};

export default i18n;
