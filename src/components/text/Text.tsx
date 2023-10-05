import * as S from "./Text.styles";
import { IColor, ISize } from "@src/themes/Theme.types";

interface Props {
	children?: string;
	size?: ISize;
	color?: IColor;
	bgcolor?: IColor;
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
