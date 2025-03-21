import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { LanguageName, languages } from "../../../locales/i18n.types";

interface Props {
	onChange: (language: LanguageName) => void;
}

export const useLocalesSearchParams = ({ onChange }: Props) => {
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const language = (searchParams.get("language") || "") as LanguageName;

		if (languages.includes(language)) {
			onChange(language);
		} else {
			searchParams.delete("language");
			setSearchParams(searchParams, { replace: true });
		}
	}, [onChange, searchParams, setSearchParams]);
};
