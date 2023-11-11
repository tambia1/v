import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/home.json";
import fi from "./locales/fi/home.json";

const resources = {
	en: en,
	fi: fi,
};

i18n.use(initReactI18next).init({
	resources,
	lng: "en",
	keySeparator: ".",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
