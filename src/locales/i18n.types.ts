import { IHome } from "./types/home.types";
import { ISettings } from "./types/settings.types";

export const languages = ["en", "fi"] as const;
export type ILanguage = (typeof languages)[number];

export type IResources = {
	[K in ILanguage]: ITranslation;
};

export type ITranslation = {
	translation: IHome & ISettings;
};
