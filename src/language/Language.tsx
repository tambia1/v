import { ReactNode, useEffect, useState, useCallback } from "react";
import { LanguageContext } from "./UseLanguage";
import { useSearchParams } from "react-router-dom";
import { ILang, ILanguage, ILanguageName, languages } from "@src/language/Language.types";

const defaultLanguageName: ILanguageName = import.meta.env.VITE_LANGUAGE || "en";
const defaultLanguage: ILanguage = languages[defaultLanguageName];

interface Props {
	children: ReactNode;
}

export const Language = ({ children }: Props) => {
	const [language, setCurrentLanguage] = useState(defaultLanguage);
	const [searchParams, setSearchParams] = useSearchParams();

	const setLanguage = (language: ILanguage) => {
		setCurrentLanguage({ ...language });
		searchParams.set("language", language.languageName);
		setSearchParams(searchParams, { replace: true });
	};

	const getText = useCallback(
		(keys: string): string => {
			let result: any = language;
			let arr = keys.split(".");

			for (let i = 1; i < arr.length; i++) {
				result = result[arr[i]];
			}

			return result;
		},
		[language]
	);

	useEffect(() => {
		const languageNameParam = searchParams.get("language") || "";

		if (Object.keys(languages).includes(languageNameParam)) {
			setCurrentLanguage(languages[languageNameParam as ILanguageName]);
		} else {
			searchParams.delete("language");
			setSearchParams(searchParams, { replace: true });
		}
	}, [searchParams]);

	return <LanguageContext.Provider value={{ language, lang, setLanguage, getText }}>{children}</LanguageContext.Provider>;
};

export const lang: ILang = (function (language: ILanguage) {
	const get = (v: string | { [key: string]: any }, str: string): {} | string => {
		if (v instanceof Object) {
			const obj: { [key: string]: {} } = {};

			Object.keys(v).forEach((k) => {
				obj[k] = get(v[k], str + "." + k);
			});

			return obj;
		}

		return str;
	};

	return get(language, "lang") as ILang;
})(defaultLanguage);
