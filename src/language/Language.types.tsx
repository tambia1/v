import { en } from "./translations/en";
import { fi } from "./translations/fi";

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
