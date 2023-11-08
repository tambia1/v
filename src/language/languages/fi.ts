import { ILanguage } from "../Language.types";
import { version } from "@src/../package.json";

export const fi: ILanguage = {
	languageName: "fi",

	pageMenu: {
		logout: {
			alertText: "Are you sure ?",
			alertButtonYes: "Yes",
			alertButtonNo: "No",
		},
	},

	home: {
		title: "Koti",
	},

	settings: {
		title: "Asetukset",
		apearance: "Ulkomuoto",
		language: {
			title: "Kieli",
			save: "Tallentaa",
			english: "English",
			finnish: "Finnish",
		},
		theme: {
			title: "Teema",
			light: "Valoa",
			dark: "Tumma",
		},
		about: {
			title: "Noin",
			text: `App Version: ${version}`,
		},
	},

	calculator: {
		title: "Laskin",
	},

	camera: {
		title: "Kamera",
	},

	notes: {
		title: "Huomautuksia",
		notes: "Huomautuksia",
	},

	tetris: {
		title: "Tetris",
	},

	clashRoyale: {
		title: "Clash Royale",
		start: "ALKAA",
		back: "TAKAISIN",
		loading: "LADATAAN...",
	},

	test: {
		title: "Test",
	},

	testDropDown: {
		title: "T-DropDown",
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
