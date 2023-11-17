import { ISettings } from "../types/settings.types";
import { version } from "@src/../package.json";

export const translation: ISettings = {
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
		appBar: {
			title: "Sivupalkin sijainti",
			top: "Yläosa",
			bottom: "Pohja",
			left: "Vasen",
			right: "Oikein",
		},
		about: {
			title: "Noin",
			text: `App Version: ${version}`,
		},
	},
};
