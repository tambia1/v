import { useLanguage } from "@src/language/hooks/UseLanguage";
import * as S from "./Text.styles";
import { IColor, ISize } from "@src/theme/Theme.types";

interface Props {
	children: string;
	size?: ISize;
	color?: IColor;
	bgcolor?: IColor;
}

export const Text = ({ children, size = "m", color = "normalFg", bgcolor = "transparent" }: Props) => {
	const { language, getText } = useLanguage();

	return (
		<S.Container key={language.languageName} $size={size} $color={color} $bgcolor={bgcolor}>
			{children.charAt(0) === "." ? getText(children) : children}
		</S.Container>
	);
};
