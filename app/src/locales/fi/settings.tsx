import { version } from "@src/../package.json";
import type { Settings } from "../types/settings.types";

export const translation: Settings = {
	settings: {
		title: "Asetukset",
		apearance: "Ulkomuoto",
		language: {
			title: "Kieli",
			save: "Tallentaa",
			english: "English",
			finnish: "Finnish",
		},
		themes: {
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
