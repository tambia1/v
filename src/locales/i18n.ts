import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translation as enHome } from "./en/home";
import { translation as enSettings } from "./en/settings";
import { translation as fiHome } from "./fi/home";
import { translation as fiSettings } from "./fi/settings";
import { IResources } from "./i18n.types";
import { GetTypeAsObjectPath } from "@src/types/Types";

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
	react: {
		transSupportBasicHtmlNodes: true,
		transKeepBasicHtmlNodesFor: ["br", "strong", "b", "i"],
	},
});

export type ILang = GetTypeAsObjectPath<IResources["en"]["translation"], "">;

export const lang: ILang = (function (language: IResources["en"]["translation"]) {
	const get = (v: string | { [key: string]: string | {} }, str: string): {} | string => {
		if (v instanceof Object) {
			const obj: { [key: string]: {} } = {};

			Object.keys(v).forEach((k) => {
				obj[k] = get(v[k], str.length ? str + "." + k : k);
			});

			return obj;
		}

		return str;
	};

	const res = get(language, "") as ILang;

	return res;
})(resources.en.translation);

export default i18n;
