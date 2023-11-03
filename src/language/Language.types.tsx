import { en } from "./languages/en";
import { fi } from "./languages/fi";

import { GetTypeAsObjectPath } from "@src/types/Types";

export type ILang = GetTypeAsObjectPath<ILanguage, "....">;

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

	home: {
		title: string;
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
		about: {
			title: string;
			text: string;
		};
	};

	calculator: {
		title: string;
	};

	camera: {
		title: string;
	};

	notes: {
		title: string;
		notes: string;
	};

	dropdown: {
		title: string;
		item0: string;
		item1: string;
		item2: string;
		item3: string;
		item4: string;
	};
};
