import { ILanguage } from "@src/language/Language.types";
import { createContext, useContext } from "react";

interface Props {
	lang: ILanguage;
	language: ILanguage;
	setLanguage: (language: ILanguage) => void;
	getText: (key: string) => string;
}

export const LanguageContext = createContext<Props | null>(null);

export const useLanguage = () => {
	const context = useContext(LanguageContext);

	if (!context) {
		throw new Error("Language must be rendered as a child component");
	}

	return context;
};
