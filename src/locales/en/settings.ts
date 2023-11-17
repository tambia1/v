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
			light: "Light",
			dark: "Dark",
		},
		appBar: {
			title: "Application Bar Position",
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
