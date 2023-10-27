import * as S from "./Text.styles";
import { ITheme } from "@src/theme/Theme.types";

interface Props {
	children: string;
	size?: keyof ITheme["size"];
	color?: keyof ITheme["color"];
	bgcolor?: keyof ITheme["color"];
}

export const Text = ({ children, size = "m", color = "normalFg", bgcolor = "transparent" }: Props) => {
	return (
		<S.Container $size={size} $color={color} $bgcolor={bgcolor}>
			{children}
		</S.Container>
	);
};
