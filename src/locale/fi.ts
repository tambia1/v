import { ILanguage } from "./Language.types";

export const fi: ILanguage = {
	languageName: "fi",

	pageMenu: {
		logout: {
			alertText: "Are you sure ?",
			alertButtonYes: "Yes",
			alertButtonNo: "No",
		},
	},

	settings: {
		title: "Asetukset",
		apearance: "Ulkomuoto",
		language: {
			title: "Kieli",
			english: "English",
			finnish: "Finnish",
		},
		theme: {
			title: "Teema",
			light: "Valoa",
			dark: "Tumma",
		},
		about: "Noin",
	},
};
