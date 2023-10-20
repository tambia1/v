import { ReactNode, useEffect, useState } from "react";
import { LanguageContext } from "./hooks/UseLanguage";
import { useSearchParams } from "react-router-dom";
import { ILang, ILanguage, ILanguageName, languages } from "@src/language/Language.types";
import { all } from "@src/language/translations/all";

const defaultLanguageName: ILanguageName = import.meta.env.VITE_LANGUAGE || "en";
const defaultLanguage: ILanguage = languages[defaultLanguageName];

export const lang: ILang = (function (language: ILanguage) {
	const get = (v: string | { [key: string]: any }, arr: string[]): {} | string => {
		if (v instanceof Object) {
			const obj: { [key: string]: {} } = {};

			Object.keys(v).forEach((k) => {
				obj[k] = get(v[k], [...arr, k]);
			});

			return obj;
		}

		return arr;
	};

	return get(language, []) as ILang;
})(defaultLanguage);

interface Props {
	children: ReactNode;
}

export const Language = ({ children }: Props) => {
	const [language, setCurrentLanguage] = useState(defaultLanguage);
	const [searchParams, setSearchParams] = useSearchParams();
	const [key, setKey] = useState(0);

	const setLanguage = (language: ILanguage) => {
		setCurrentLanguage(language);
		searchParams.set("language", language.languageName);
		setSearchParams(searchParams, { replace: true });
		setKey(key + 1);
	};

	const getText = (keys: string[]): string => {
		let result: any = language;

		for (const key of keys) {
			if (typeof result[key] === "object") {
				result = result[key];
			}
		}

		return result;
	};

	useEffect(() => {
		const languageNameParam = searchParams.get("language") || "";

		if (Object.keys(languages).includes(languageNameParam)) {
			setCurrentLanguage(languages[languageNameParam as ILanguageName]);
		} else {
			searchParams.delete("language");
			setSearchParams(searchParams, { replace: true });
		}
	}, [searchParams]);

	return (
		<LanguageContext.Provider key={key} value={{ all, language, lang, setLanguage, getText }}>
			{children}
		</LanguageContext.Provider>
	);
};
