import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ILanguageName, languages } from "../../../locales/i18n.types";

interface Props {
	onChange: (language: ILanguageName) => void;
}

export const useLocalesSearchParams = ({ onChange }: Props) => {
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const language = (searchParams.get("language") || "") as ILanguageName;

		if (languages.includes(language)) {
			onChange(language);
		} else {
			searchParams.delete("language");
			setSearchParams(searchParams, { replace: true });
		}
	}, [searchParams]);
};
