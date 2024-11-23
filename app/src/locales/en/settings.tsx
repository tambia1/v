import { version } from "@src/../package.json";
import type { ISettings } from "../types/settings.types";

export const translation: ISettings = {
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
			mode: "Mode",
			light: "Light",
			dark: "Dark",
			background: "Background",
			noBackground: "No Background",
		},
		layout: {
			title: "Layout",
			barPositon: "Bar Position",
			top: "Top",
			bottom: "Bottom",
			left: "Left",
			right: "Right",
		},
		about: {
			title: "About app",
			text: `App Version: ${version}`,
		},
	},
};
