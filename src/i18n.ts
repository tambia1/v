import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translation as enHome } from "./locales/en/home";
import { translation as enSettings } from "./locales/en/settings";
import { translation as fiHome } from "./locales/fi/home";
import { translation as fiSettings } from "./locales/fi/settings";

const resources = {
	en: {
		translation: {
			...enHome,
			...enSettings,
		},
	},
	fi: {
		translation: {
			...fiHome,
			...fiSettings,
		},
	},
};

i18n.use(initReactI18next).init({
	resources: resources,
	lng: "en",
	keySeparator: ".",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
