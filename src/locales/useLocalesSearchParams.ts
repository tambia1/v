import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { ILanguage, languages } from "./i18n.types";

export const useLocalesSearchParams = () => {
	const { i18n } = useTranslation();
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const language = (searchParams.get("language") || "") as ILanguage;

		if (languages.includes(language)) {
			i18n.changeLanguage(language);
		} else {
			searchParams.delete("language");
			setSearchParams(searchParams, { replace: true });
		}
	}, [searchParams]);
};
