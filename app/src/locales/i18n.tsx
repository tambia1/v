import type { GetTypeAsObjectPath } from "@src/types/Types";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translation as enChat } from "./en/chat";
import { translation as enHome } from "./en/home";
import { translation as enSettings } from "./en/settings";
import { translation as fiChat } from "./fi/chat";
import { translation as fiHome } from "./fi/home";
import { translation as fiSettings } from "./fi/settings";
import type { IResources } from "./i18n.types";

const resources: IResources = {
	en: {
		translation: {
			...enHome,
			...enSettings,
			...enChat,
		},
	},
	fi: {
		translation: {
			...fiHome,
			...fiSettings,
			...fiChat,
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

type IValue = string | { [key: string]: IValue };

export const lang: ILang = ((language: IResources["en"]["translation"]) => {
	const get = (v: IValue, str: string): IValue => {
		if (v instanceof Object) {
			const obj: { [key: string]: IValue } = {};

			Object.keys(v).forEach((k) => {
				obj[k] = get(v[k], str.length ? `${str}.${k}` : k);
			});

			return obj;
		}

		return str;
	};

	const res = get(language, "") as ILang;

	return res;
})(resources.en.translation);

export default i18n;
