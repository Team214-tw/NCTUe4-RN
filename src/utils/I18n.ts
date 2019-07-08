import * as RNLocalize from "react-native-localize";
import I18n, { translate } from "i18n-js";

const translationGetters: { [lang: string]: Function } = {
    // lazy requires (metro bundler does not support symlinks)
    'en': () => require("./locales/en.json"),
    'zh-Hant-TW': () => require("./locales/zh_TW.json"),
};

const fallback = { languageTag: "en", isRTL: false }
const { languageTag, isRTL } = RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) || fallback

I18n.translations = { [languageTag]: translationGetters[languageTag]() };
I18n.locale = languageTag;

export default I18n;