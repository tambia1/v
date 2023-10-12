import { en } from "./en";
import { fi } from "./fi";

export type ILanguageName = "en" | "fi";

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
		language: {
			title: string;
			english: string;
			finnish: string;
		};
		theme: {
			title: string;
			light: string;
			dark: string;
		};
		about: string;
	};
};
