import { ILanguage } from "../Language.types";
import { version } from "@src/../package.json";

export const en: ILanguage = {
	languageName: "en",

	pageMenu: {
		logout: {
			alertText: "Are you sure ?",
			alertButtonYes: "Yes",
			alertButtonNo: "No",
		},
	},

	home: {
		title: "Applications",
	},

	settings: {
		title: "Settings",
		apearance: "Appearance",
		language: {
			title: "Language",
			save: "Save",
			english: "English",
			finnish: "Finnish",
		},
		theme: {
			title: "Theme",
			light: "Light",
			dark: "Dark",
		},
		about: {
			title: "About",
			text: `App Version: ${version}`,
		},
	},

	calculator: {
		title: "Calculator",
	},

	camera: {
		title: "Camera",
	},
	notes: {
		title: "Notes",
		notes: "Notes",
	},
};
