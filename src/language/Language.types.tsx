import { en } from "./translations/en";
import { fi } from "./translations/fi";
import { GetTypeAsObjectArray } from "@src/types/Types";

export type ILang = GetTypeAsObjectArray<ILanguage>;

export const languages = { en, fi };

export type ILanguageName = keyof typeof languages;

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
			save: string;
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

	calculator: {
		title: string;
	};

	camera: {
		title: string;
	};

	notes: {
		title: string;
	};
};
