import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ITheme, themes } from "./Theme.types";
import { useTheme } from "./UseTheme";

export const useThemesSearchParams = () => {
	const { setTheme } = useTheme();
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
