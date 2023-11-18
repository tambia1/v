import { ISettings } from "../types/settings.types";
import { version } from "@src/../package.json";

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
		bar: {
			title: "Bar Position",
			top: "Top",
			bottom: "Bottom",
			left: "Left",
			right: "Right",
		},
		about: {
			title: "About",
			text: `App Version: ${version}`,
		},
	},
};
