import { IChat } from "./types/chat.types";
import { IHome } from "./types/home.types";
import { ISettings } from "./types/settings.types";

export const languages = ["en", "fi"] as const;
export type ILanguageName = (typeof languages)[number];

export type IResources = {
	[K in ILanguageName]: ITranslation;
};

export type ITranslation = {
	translation: IHome & ISettings & IChat;
};
