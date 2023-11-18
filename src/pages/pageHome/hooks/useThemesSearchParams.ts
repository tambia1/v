import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ITheme, themes } from "../../../theme/Theme.types";

interface Props {
	onChange: (themeName: ITheme["themeName"]) => void;
}

export const useThemesSearchParams = ({ onChange }: Props) => {
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const theme = (searchParams.get("theme") || "") as ITheme["themeName"];

		if (Object.keys(themes).includes(theme)) {
			onChange(theme);
		} else {
			searchParams.delete("theme");
			setSearchParams(searchParams, { replace: true });
		}
	}, [searchParams]);
};
