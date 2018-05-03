import I18n from 'react-native-i18n';
import { en, ja } from './languages';

I18n.fallbacks = true;

I18n.translations = {
  en,
  ja,
};

export default I18n;
