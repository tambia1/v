import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ITheme, themes } from "./Theme.types";
import { useThemeContext } from "./UseThemeContext";

export const useThemesSearchParams = () => {
	const { setTheme } = useThemeContext();
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const theme = (searchParams.get("theme") || "") as ITheme["themeName"];

		if (Object.keys(themes).includes(theme)) {
			setTheme(themes[theme]);
		} else {
			searchParams.delete("theme");
			setSearchParams(searchParams, { replace: true });
		}
	}, [searchParams]);
};
