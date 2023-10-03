import { all } from "@src/locale/all";
import { ILanguage } from "@src/locale/Language.types";
import { createContext, useContext } from "react";

export const LanguageContext = createContext<{ all: typeof all; language: ILanguage; setLanguage: (language: ILanguage) => void } | null>(null);

export const useLanguage = () => {
	const context = useContext(LanguageContext);

	if (!context) {
		throw new Error("Language must be rendered as a child component");
	}

	return context;
};
