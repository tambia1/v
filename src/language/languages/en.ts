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

	tetris: {
		title: "Tetris",
	},

	clashRoyale: {
		title: "Clash Royale",
		start: "START",
		back: "BACK",
		loading: "LOADING...",
	},

	test: {
		title: "Test",
	},

	testDropDown: {
		title: "Test DropDown",
		item0: "Item 0",
		item1: "Item 1",
		item2: "Item 2",
		item3: "Item 3",
		item4: "Item 4",
	},

	testTable: {
		title: "Test Table",
	},
};
