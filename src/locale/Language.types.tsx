import { en } from "./en";
import { fi } from "./fi";

export const languages: { [key in LanguageName]: ILanguage } = { en, fi };

export type LanguageName = "en" | "fi";

export interface ILanguage {
	languageName: LanguageName;

	pageMenu: {
		logout: {
			alertText: string;
			alertButtonYes: string;
			alertButtonNo: string;
		};
	};
	screenDataCenter: {
		title: string;
	};
	screenThemes: {
		title: string;
	};
	screenAbout: {
		title: string;
	};
	screenLogout: {
		title: string;
	};
	settings: {
		title: string;
		apearance: string;
		language: string;
		theme: string;
		about: string;
	};
}
