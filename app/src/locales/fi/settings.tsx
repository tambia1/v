import { version } from "@src/../package.json";
import type { ISettings } from "../types/settings.types";

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
			mode: "Tila",
			light: "Valoa",
			dark: "Tumma",
			background: "Tausta",
			noBackground: "Ei taustaa",
		},
		layout: {
			title: "Asettelu",
			barPositon: "Sivupalkin sijainti",
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
