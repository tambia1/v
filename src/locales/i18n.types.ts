import { IHome } from "./types/home.types";
import { ISettings } from "./types/settings.types";

export type IResources = {
	en: ITranslation;
	fi: ITranslation;
};

export type ITranslation = {
	translation: IHome & ISettings;
};
