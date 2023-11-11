import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translation as enHome } from "./en/home";
import { translation as enSettings } from "./en/settings";
import { translation as fiHome } from "./fi/home";
import { translation as fiSettings } from "./fi/settings";
import { IResources } from "./i18n.types";

const resources: IResources = {
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
