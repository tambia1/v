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
		layout: {
			title: "Layout",
			barPositon: "Bar Position",
			top: "Top",
			bottom: "Bottom",
			left: "Left",
			right: "Right",
		},
		store: "Clear apps from store",
		about: {
			title: "About",
			text: `App Version: ${version}`,
		},
	},
};
