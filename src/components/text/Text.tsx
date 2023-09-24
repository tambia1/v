import { ITheme } from "@src/themes/Theme.types";
import * as S from "./Text.styles";
import { Size } from "@src/types/Sizes";
import { useState } from "react";
import { useTheme } from "../theme/hooks/UseTheme";

interface Props {
	children?: string;
	size?: Size;
	color?: string;
	bgcolor?: string;
}

export const Text = ({ children, size = "m", color, bgcolor }: Props) => {
	const theme = useTheme();

	color = color ?? theme.theme.color.onBackground;
	bgcolor = bgcolor ?? "transparent";

	return (
		<S.Container $size={size} $color={color} $bgcolor={bgcolor}>
			{children}
		</S.Container>
	);
};
