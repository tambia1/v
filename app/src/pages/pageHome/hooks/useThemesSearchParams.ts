import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Theme, themes } from "../../../theme/Theme.types";

interface Props {
	onChange: (themeName: Theme["themeName"]) => void;
}

export const useThemesSearchParams = ({ onChange }: Props) => {
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const theme = (searchParams.get("theme") || "") as Theme["themeName"];

		if (Object.keys(themes).includes(theme)) {
			onChange(theme);
		} else {
			searchParams.delete("theme");
			setSearchParams(searchParams, { replace: true });
		}
	}, [searchParams, onChange, setSearchParams]);
};
