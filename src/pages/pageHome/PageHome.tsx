import { version } from "@src/../package.json";
import { Button } from "@src/components/button/Button.styles";
import { useTheme } from "@src/components/theme/Theme";
import { content } from "@src/locale/en";
import { themes } from "@src/themes/Theme.types";
import * as S from "./PageHome.styles";

export const PageHome = () => {
	const { setTheme } = useTheme();

	return (
		<S.Container>
			<S.Title>Hello</S.Title>
			<Button
				onClick={() => {
					setTheme(themes.themeLight);
				}}
			>
				Light
			</Button>
			<Button
				onClick={() => {
					setTheme(themes.themeDark);
				}}
			>
				Dark
			</Button>
			<S.Version>{content.all.version.replace(/\{version\}/g, version)}</S.Version>
		</S.Container>
	);
};
