import { GetTypeKeysAsArray } from "@src/types/Types";
import { en } from "./en";
import { fi } from "./fi";

export type ILanguageName = "en" | "fi";
export type ILanguageKeys = GetTypeKeysAsArray<ILanguage>;

export const languages: { [key in ILanguageName]: ILanguage } = { en, fi };

export type ILanguage = {
	languageName: ILanguageName;

	pageMenu: {
		logout: {
			alertText: string;
			alertButtonYes: string;
			alertButtonNo: string;
		};
	};

	settings: {
		title: string;
		apearance: string;
		language: string;
		theme: string;
		about: string;
	};
};
