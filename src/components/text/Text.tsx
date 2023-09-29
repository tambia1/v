import * as S from "./Text.styles";
import { Color, Size } from "@src/themes/Theme.types";

interface Props {
	children?: string;
	size?: Size;
	color?: Color;
	bgcolor?: Color;
}

export const Text = ({ children, size = "m", color, bgcolor }: Props) => {
	color = color ?? "normalFg";
	bgcolor = bgcolor ?? "transparent";

	return (
		<S.Container $size={size} $color={color} $bgcolor={bgcolor}>
			{children}
		</S.Container>
	);
};
