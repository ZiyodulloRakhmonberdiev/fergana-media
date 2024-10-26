import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEn from "./locales/eng/translation.json";
import translationRu from "./locales/ru/translation.json";
import translationUz from "./locales/uz/translation.json";
import translationCyrl from "./locales/uz-cyrl/translation.json";

const resources = {
  en: { translation: translationEn },
  ru: { translation: translationRu },
  uz: { translation: translationUz },
  cyrl: { translation: translationCyrl },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "uz",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
