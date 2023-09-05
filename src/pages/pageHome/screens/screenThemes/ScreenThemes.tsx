import { useThemes } from "@src/hooks/UseThemes";
import { Theme, ThemeName, themes } from "@src/themes/Theme.types";
import { Container } from "./ScreenThemes.styles";

export interface Props {}

export const ScreenThemes = (props: Props) => {
	const { theme, setTheme } = useThemes();

	const onChangeTheme = (theme: Theme) => {
		setTheme(theme);
	};

	return (
		<Container>
			{Object.keys(themes).map((themeName) => (
				<div key={themeName}>
					<input type="radio" id={themeName} checked={themeName === theme.themeName} onChange={() => onChangeTheme(themes[themeName as ThemeName])} />
					<label htmlFor={themeName}>{themeName}</label>
				</div>
			))}
		</Container>
	);
};
