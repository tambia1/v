import type { Chat } from "./types/chat.types";
import type { Home } from "./types/home.types";
import type { Settings } from "./types/settings.types";

export const languages = ["en", "fi"] as const;
export type LanguageName = (typeof languages)[number];

export type Resources = {
	[K in LanguageName]: Translation;
};

export type Translation = {
	translation: Home & Settings & Chat;
};
